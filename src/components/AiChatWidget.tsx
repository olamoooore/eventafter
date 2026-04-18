import { AnimatePresence, motion } from 'motion/react';
import { LoaderCircle, MessageCircleMore, SendHorizontal, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  tone?: 'default' | 'error';
};

type GroqMessage = {
  role: 'system' | 'assistant' | 'user';
  content: string;
};

const groqApiKey = process.env.GROQ_API_KEY?.trim();
const groqModel = 'llama-3.3-70b-versatile';

const systemInstruction = `You are the Ever After Centre AI concierge for the venue website.

Use only the business facts below when answering. If a detail is missing, say you do not have that information yet and invite the visitor to call 0805 956 5056 or use the booking form.

Business facts:
- Venue name: Ever After Centre.
- Location: 6 Bolaji Street, Off Kudirat Abiola Way / Oregun Road, Ikeja, Lagos, Nigeria.
- Phone number: 0805 956 5056.
- Emails: hello@everaftercentre.com and bookings@everaftercentre.com.
- Business hours: Monday to Saturday, 9:00 AM to 6:00 PM. Sunday is by appointment only.
- Services: weddings, birthday celebrations, seminars and conferences, corporate events, and other events.
- The site has a booking page where visitors can submit an event request.

Behavior rules:
- Be warm, concise, and useful.
- Never invent pricing, availability, capacity, package details, or policies that are not listed above.
- When asked about unavailable details, say so clearly and direct the visitor to contact the team.
- Prefer short paragraphs or short bullet lists.
- Encourage the next step when relevant.`;

function createMessageId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createWelcomeMessage(): ChatMessage {
  return {
    id: createMessageId(),
    role: 'assistant',
    content:
      'Hello, I am the Ever After AI concierge. Ask about our venue, services, location, business hours, or booking process.',
  };
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMessage()]);
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollTop = scroller.scrollHeight;
  }, [messages, isSending]);

  const resetConversation = () => {
    setMessages([createWelcomeMessage()]);
    setErrorText(null);
    setDraft('');
  };

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();

    if (!message || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: message,
    };

    const assistantMessageId = createMessageId();

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      { id: assistantMessageId, role: 'assistant', content: '' },
    ]);
    setDraft('');
    setErrorText(null);
    setIsSending(true);

    try {
      if (!groqApiKey) {
        throw new Error('GROQ_API_KEY is not configured for live AI responses.');
      }

      const historyMessages: GroqMessage[] = messages
        .filter((entry) => entry.content.trim())
        .map((entry) => ({
          role: entry.role,
          content: entry.content,
        }));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: groqModel,
          temperature: 0.6,
          messages: [
            { role: 'system', content: systemInstruction },
            ...historyMessages,
            { role: 'user', content: message },
          ],
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Groq request failed (${response.status}): ${responseBody || 'Unknown error'}`);
      }

      const payload = await response.json() as {
        choices?: Array<{
          message?: {
            content?: string;
          };
        }>;
      };

      const responseText = payload.choices?.[0]?.message?.content?.trim() ?? '';

      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === assistantMessageId
            ? { ...currentMessage, content: responseText }
            : currentMessage,
        ),
      );

      if (!responseText.trim()) {
        throw new Error('The assistant did not return a response.');
      }
    } catch (error) {
      const fallbackMessage =
        error instanceof Error
          ? `${error.message} If you need immediate help, call 0805 956 5056.`
          : 'The assistant is temporarily unavailable. If you need immediate help, call 0805 956 5056.';

      setErrorText(fallbackMessage);
      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === assistantMessageId
            ? { ...currentMessage, content: fallbackMessage, tone: 'error' }
            : currentMessage,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(42rem,calc(100vh-8rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-[linear-gradient(180deg,rgba(246,244,237,0.98),rgba(255,255,255,0.96))] shadow-[0_30px_80px_rgba(26,26,26,0.22)] md:bottom-28 md:right-6"
          >
            <div className="relative overflow-hidden border-b border-gold/10 bg-[linear-gradient(135deg,rgba(229,177,100,0.14),rgba(106,117,87,0.08))] px-4 py-3 backdrop-blur-md">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gold/12 blur-2xl" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white/90 shadow-sm">
                    <img
                      src="/logo.png"
                      alt="Ever After Centre logo"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] uppercase tracking-[0.28em] text-sage/80">Ever After Centre</p>
                    <p className="truncate font-serif text-xl leading-none text-ink">Concierge Chat</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetConversation}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink/70 transition-colors hover:border-gold hover:text-gold"
                    aria-label="Clear conversation"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink/70 transition-colors hover:border-gold hover:text-gold"
                    aria-label="Close AI chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div ref={scrollerRef} className="relative flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(246,244,237,0.62))] px-4 py-5 md:px-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(229,177,100,0.09),transparent_60%)]" />
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-[linear-gradient(135deg,#243026_0%,#6a7557_100%)] text-bg-warm shadow-[0_14px_30px_rgba(36,48,38,0.16)]'
                        : message.tone === 'error'
                          ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-800'
                          : 'rounded-bl-md border border-gold/14 bg-[linear-gradient(180deg,rgba(246,244,237,1),rgba(255,255,255,0.95))] text-ink/80 shadow-[0_12px_28px_rgba(36,48,38,0.06)]'
                    }`}
                  >
                    {message.content || (
                      <span className="inline-flex items-center gap-2 text-ink/50">
                        <LoaderCircle size={14} className="animate-spin" />
                        Thinking...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gold/10 bg-[linear-gradient(180deg,rgba(246,244,237,0.92),rgba(255,255,255,0.96))] px-4 pb-4 pt-3 md:px-5 md:pb-5">
              {errorText && (
                <p className="mb-3 text-xs leading-relaxed text-red-700">{errorText}</p>
              )}

              {!groqApiKey && (
                <p className="mb-3 text-xs leading-relaxed text-ink/60">
                  Live responses require a configured GROQ_API_KEY.
                </p>
              )}

              <div className="flex items-end gap-3 rounded-[1.75rem] border border-gold/14 bg-white/96 p-2 shadow-[0_12px_32px_rgba(36,48,38,0.08)]">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask about the venue, hours, location, or booking"
                  className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/35"
                />
                <button
                  type="button"
                  onClick={() => void sendMessage(draft)}
                  disabled={isSending || !draft.trim()}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink transition-all hover:scale-[1.03] hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-ink/30"
                  aria-label="Send message"
                >
                  {isSending ? <LoaderCircle size={18} className="animate-spin" /> : <SendHorizontal size={18} />}
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-[linear-gradient(135deg,#243026_0%,#6a7557_100%)] text-bg-warm shadow-[0_18px_40px_rgba(36,48,38,0.25)] transition-colors hover:bg-gold hover:text-ink md:bottom-8 md:right-6"
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-warm/12 ring-1 ring-white/10">
          <MessageCircleMore size={20} />
        </div>
      </motion.button>
    </>
  );
}