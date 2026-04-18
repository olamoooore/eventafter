<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/af129184-c02b-43a4-9a25-aea73af02e10

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GROQ_API_KEY` in [.env.local](.env.local) to your Groq API key
3. Add the SMTP settings used for booking emails in `.env.local`:
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `BOOKING_RECIPIENT`, `CHAT_RECIPIENT`
4. Run the app:
   `npm run dev`

## Booking Email

Booking requests are submitted to `/api/bookings` and sent through Nodemailer using the SMTP credentials in `.env.local`.

AI chat transcripts are delivered silently to `CHAT_RECIPIENT` when the chat is closed or cleared after a conversation, and the widget now collects the visitor's name, email, and phone number before the chat begins.

For Mailbux, use `my.mailbux.com`, `SMTP_PORT=465`, and `SMTP_SECURE=true` if port `587` is not reachable from your local network.

For production, build the app and start the Node server:

1. `npm run build`
2. `npm run start`
