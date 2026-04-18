import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

const smtpHost = process.env.SMTP_HOST || 'my.mailbux.com';
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = (process.env.SMTP_SECURE || String(smtpPort === 465)).toLowerCase() === 'true';
const smtpUser = process.env.SMTP_USER || 'info@everaftercentre.com';
const smtpPass = process.env.SMTP_PASS;
const bookingRecipient = process.env.BOOKING_RECIPIENT || 'info@everaftercentre.com';
const bookingFromName = process.env.BOOKING_FROM_NAME || 'Ever After Centre Website';
const chatRecipient = process.env.CHAT_RECIPIENT || bookingRecipient;
const chatFromName = process.env.CHAT_FROM_NAME || 'Ever After Centre Chat';
const port = Number(process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 3001));

app.use(express.json({ limit: '200kb' }));

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getTransporter() {
  if (!smtpPass) {
    throw new Error('SMTP_PASS is not configured on the server.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    requireTLS: !smtpSecure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

async function sendMail(message) {
  const transporter = getTransporter();
  return transporter.sendMail(message);
}

function toBookingEmailHtml(booking) {
  const rows = [
    ['Full name', booking.fullName],
    ['Phone', booking.phone],
    ['Email', booking.email],
    ['Event type', booking.eventType],
    ['Event date', booking.eventDate],
    ['Estimated guests', booking.guests || 'Not provided'],
    ['Additional details', booking.details || 'Not provided'],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #243026; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New booking request from Ever After Centre website</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 10px 12px; border: 1px solid #d9dfd4; font-weight: 700; width: 180px; vertical-align: top;">${escapeHtml(label)}</td>
                  <td style="padding: 10px 12px; border: 1px solid #d9dfd4;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function toBookingEmailText(booking) {
  return [
    'New booking request from Ever After Centre website',
    '',
    `Full name: ${booking.fullName}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    `Event type: ${booking.eventType}`,
    `Event date: ${booking.eventDate}`,
    `Estimated guests: ${booking.guests || 'Not provided'}`,
    `Additional details: ${booking.details || 'Not provided'}`,
  ].join('\n');
}

function toBookingConfirmationHtml(booking) {
  return `
    <div style="font-family: Arial, sans-serif; color: #243026; line-height: 1.7;">
      <h2 style="margin-bottom: 16px;">We have received your booking request</h2>
      <p>Hello ${escapeHtml(booking.fullName)},</p>
      <p>Thank you for contacting Ever After Centre. We have received your request for a ${escapeHtml(booking.eventType)} on ${escapeHtml(booking.eventDate)}.</p>
      <p>Our team will review your details and respond as soon as possible with the next steps.</p>
      <p>If your request is urgent, please call 0805 956 5056 or reply to this email.</p>
      <p style="margin-top: 24px;">Ever After Centre<br />6 Bolaji Street, Off Kudirat Abiola Way / Oregun Road, Ikeja, Lagos</p>
    </div>
  `;
}

function toBookingConfirmationText(booking) {
  return [
    `Hello ${booking.fullName},`,
    '',
    `We have received your booking request for a ${booking.eventType} on ${booking.eventDate}.`,
    'Our team will review your details and respond as soon as possible.',
    'If your request is urgent, please call 0805 956 5056 or reply to this email.',
    '',
    'Ever After Centre',
    '6 Bolaji Street, Off Kudirat Abiola Way / Oregun Road, Ikeja, Lagos',
  ].join('\n');
}

function toChatTranscriptHtml(payload) {
  return `
    <div style="font-family: Arial, sans-serif; color: #243026; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">AI concierge chat transcript</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Ended at:</strong> ${escapeHtml(payload.endedAt)}</p>
      <hr style="border: 0; border-top: 1px solid #d9dfd4; margin: 24px 0;" />
      ${payload.messages
        .map(
          (message) => `
            <div style="margin-bottom: 16px; padding: 12px 14px; background: ${message.role === 'user' ? '#243026' : '#f6f4ed'}; color: ${message.role === 'user' ? '#f6f4ed' : '#243026'}; border-radius: 12px;">
              <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8;">${escapeHtml(message.role)}</p>
              <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message.content)}</p>
            </div>
          `,
        )
        .join('')}
    </div>
  `;
}

function toChatTranscriptText(payload) {
  return [
    'AI concierge chat transcript',
    '',
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Ended at: ${payload.endedAt}`,
    '',
    ...payload.messages.flatMap((message) => [
      `${message.role.toUpperCase()}:`,
      message.content,
      '',
    ]),
  ].join('\n');
}

function validateBookingPayload(payload) {
  const requiredFields = ['fullName', 'phone', 'email', 'eventType', 'eventDate'];

  for (const field of requiredFields) {
    if (typeof payload[field] !== 'string' || !payload[field].trim()) {
      return `${field} is required.`;
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return 'A valid email address is required.';
  }

  return null;
}

function validateChatTranscriptPayload(payload) {
  const requiredFields = ['fullName', 'phone', 'email', 'endedAt'];

  for (const field of requiredFields) {
    if (typeof payload[field] !== 'string' || !payload[field].trim()) {
      return `${field} is required.`;
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return 'A valid email address is required.';
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return 'At least one chat message is required.';
  }

  const invalidMessage = payload.messages.find(
    (message) =>
      typeof message?.role !== 'string' ||
      typeof message?.content !== 'string' ||
      !message.content.trim(),
  );

  if (invalidMessage) {
    return 'Each chat message must include a role and content.';
  }

  return null;
}

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    mailConfigured: Boolean(smtpPass),
  });
});

app.post('/api/bookings', async (request, response) => {
  const booking = {
    fullName: String(request.body?.fullName || '').trim(),
    phone: String(request.body?.phone || '').trim(),
    email: String(request.body?.email || '').trim(),
    eventType: String(request.body?.eventType || '').trim(),
    eventDate: String(request.body?.eventDate || '').trim(),
    guests: String(request.body?.guests || '').trim(),
    details: String(request.body?.details || '').trim(),
  };

  const validationError = validateBookingPayload(booking);

  if (validationError) {
    response.status(400).json({ message: validationError });
    return;
  }

  try {
    await sendMail({
      from: `${bookingFromName} <${smtpUser}>`,
      to: bookingRecipient,
      replyTo: booking.email,
      subject: `New booking request: ${booking.eventType} for ${booking.fullName}`,
      text: toBookingEmailText(booking),
      html: toBookingEmailHtml(booking),
    });

    try {
      await sendMail({
        from: `${bookingFromName} <${smtpUser}>`,
        to: booking.email,
        replyTo: bookingRecipient,
        subject: 'We have received your booking request',
        text: toBookingConfirmationText(booking),
        html: toBookingConfirmationHtml(booking),
      });
    } catch (error) {
      console.error('Booking confirmation email failed', error);
    }

    response.status(200).json({ message: 'Your booking request has been sent successfully.' });
  } catch (error) {
    console.error('Booking email failed', error);
    response.status(500).json({
      message: 'We could not send your request right now. Please call 0805 956 5056 or email info@everaftercentre.com.',
    });
  }
});

app.post('/api/chat/transcript', async (request, response) => {
  const payload = {
    fullName: String(request.body?.fullName || '').trim(),
    phone: String(request.body?.phone || '').trim(),
    email: String(request.body?.email || '').trim(),
    endedAt: String(request.body?.endedAt || '').trim(),
    messages: Array.isArray(request.body?.messages)
      ? request.body.messages
          .map((message) => ({
            role: String(message?.role || '').trim(),
            content: String(message?.content || '').trim(),
          }))
          .filter((message) => message.content)
      : [],
  };

  const validationError = validateChatTranscriptPayload(payload);

  if (validationError) {
    response.status(400).json({ message: validationError });
    return;
  }

  try {
    await sendMail({
      from: `${chatFromName} <${smtpUser}>`,
      to: chatRecipient,
      replyTo: payload.email,
      subject: `Chat transcript: ${payload.fullName}`,
      text: toChatTranscriptText(payload),
      html: toChatTranscriptHtml(payload),
    });

    response.status(200).json({ message: 'Chat transcript delivered.' });
  } catch (error) {
    console.error('Chat transcript email failed', error);
    response.status(500).json({ message: 'Unable to deliver chat transcript.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');

  app.use(express.static(distPath));
  app.get('*', (request, response, next) => {
    if (request.path.startsWith('/api/')) {
      next();
      return;
    }

    response.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Ever After server listening on http://localhost:${port}`);
});