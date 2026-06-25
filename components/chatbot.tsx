'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, ChevronDown, Trash2, CornerDownRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────────── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content: "Hi! I'm Mahmoud's AI assistant. What would you like to know?",
  timestamp: new Date(),
};

const QUICK_PROMPTS = [
  "What projects has he built?",
  "What are his technical skills?",
  "Tell me about his experience",
  "How can I contact him?",
];

const formatTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/* ─────────────────────────────────────────────────
   Markdown — all colours hardcoded, zero bleed
───────────────────────────────────────────────── */
function BotMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 text-[13px] leading-relaxed text-pal-50">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 list-disc space-y-0.5 pl-4 text-[13px] text-pal-50">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal space-y-0.5 pl-4 text-[13px] text-pal-50">{children}</ol>
        ),
        li: ({ children }) => <li className="text-[13px] text-pal-50">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-pal-100">{children}</em>,
        a: ({ children, href }) => {
          const raw = typeof children === 'string' ? children : String(children ?? '');
          let label: string = raw;

          if (href?.startsWith('mailto:')) {
            label = 'Email';
          } else if (href && (raw === href || raw.startsWith('http'))) {
            try { label = new URL(href).hostname.replace(/^www\./, ''); } catch { label = raw; }
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="text-amber-300 underline underline-offset-2 hover:text-amber-200 text-[13px]">
              {label}
            </a>
          );
        },
        code: ({ children, className }) =>
          className?.includes('language-') ? (
            <code className="my-2 block overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-2.5 font-mono text-xs text-emerald-400">
              {children}
            </code>
          ) : (
            <code className="rounded-md bg-black/40 px-1.5 py-0.5 font-mono text-xs text-emerald-400">
              {children}
            </code>
          ),
        pre: ({ children }) => (
          <pre className="my-2 overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-3 text-xs">
            {children}
          </pre>
        ),
        h1: ({ children }) => <h1 className="mb-1.5 mt-3 text-sm font-bold text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-1 mt-2.5 text-sm font-bold text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-1 mt-2 text-xs font-semibold text-pal-50">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-pal-200/60 pl-3 text-[13px] italic text-pal-100">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-3 border-white/10" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/* ─────────────────────────────────────────────────
   Animated typing dots
───────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-0.5">
      {[0, 160, 320].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400/60"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [isLoadingFollowUps, setIsLoadingFollowUps] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const streamingIdRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);
  useEffect(() => { scrollToBottom(); }, [followUps, isLoadingFollowUps, scrollToBottom]);
  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => textareaRef.current?.focus(), 150);
  }, [isOpen, isMinimized]);
  useEffect(() => () => { abortRef.current?.abort(); }, []);

  /* ── Follow-up fetch (non-blocking, non-critical) ── */
  const fetchFollowUps = async (question: string, answer: string) => {
    setIsLoadingFollowUps(true);
    try {
      const res = await fetch('/api/chat/followups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
      const data = await res.json();
      if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setFollowUps(data.suggestions);
      }
    } catch { /* silent fail */ } finally {
      setIsLoadingFollowUps(false);
    }
  };

  /* ── Core send / stream ── */
  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading || isStreaming) return;

    // Clear previous follow-ups immediately
    setFollowUps([]);

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
    const historyForAPI = messages.slice(1);

    setMessages((p) => [...p, userMsg]);
    if (!overrideText) {
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    const aId = `a-${Date.now()}`;
    streamingIdRef.current = aId;
    abortRef.current = new AbortController();

    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, chatHistory: historyForAPI }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || 'Request failed');
      }
      if (!res.body) throw new Error('No response body');

      setIsLoading(false);
      setIsStreaming(true);
      setMessages((p) => [...p, { id: aId, role: 'assistant', content: '', timestamp: new Date() }]);

      reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let accumulated = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split('\n\n');
        buf = parts.pop() ?? '';

        for (const part of parts) {
          if (!part.startsWith('data: ')) continue;
          const raw = part.slice(6).trim();

          if (raw === '[DONE]') { streamDone = true; break; }

          // Parse JSON separately so only syntax errors are swallowed,
          // not the error thrown below (which must reach the outer catch)
          let parsed: any;
          try { parsed = JSON.parse(raw); } catch { continue; }

          if (parsed.error) throw new Error(parsed.error); // reaches outer catch
          if (parsed.text) {
            accumulated += parsed.text;
            setMessages((p) => {
              const upd = [...p];
              const last = upd[upd.length - 1];
              if (last?.id === aId) upd[upd.length - 1] = { ...last, content: last.content + parsed.text };
              return upd;
            });
          }
        }
      }

      // Release the reader regardless of how the loop ended
      reader.cancel();

      // Fetch follow-up suggestions after response completes
      if (accumulated.trim()) {
        fetchFollowUps(text, accumulated);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') { reader?.cancel(); return; }
      setMessages((p) => {
        const last = p[p.length - 1];
        const base = last?.id === aId ? p.slice(0, -1) : p;
        return [...base, { id: `e-${Date.now()}`, role: 'assistant', content: 'Something went wrong. Please try again.', timestamp: new Date() }];
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      streamingIdRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleClose = () => {
    abortRef.current?.abort();
    setIsOpen(false);
    setIsStreaming(false);
    setIsLoading(false);
  };

  const handleClear = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setIsLoading(false);
    setInput('');
    setFollowUps([]);
    setMessages([{ ...INITIAL_MESSAGE, id: `init-${Date.now()}`, timestamp: new Date() }]);
  };

  const showPrompts = messages.length === 1 && !isLoading && !isStreaming;

  /* ─────────────────────────────────────
     Floating trigger button
  ───────────────────────────────────── */
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI assistant"
        className="group fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-md border border-amber-400/40 bg-pal-900/90 px-4 font-mono text-sm text-amber-300 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur transition-colors duration-200 hover:border-amber-400/70 hover:bg-pal-800/90 active:scale-95 focus:outline-none sm:bottom-6 sm:right-6"
      >
        <span className="text-term-green">~$</span>
        <span>ask-me</span>
        <span className="cursor-blink" aria-hidden />
      </button>
    );
  }

  /* ─────────────────────────────────────
     Chat window
  ───────────────────────────────────── */
  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col overflow-hidden rounded-md font-mono',
        'border border-white/[0.1] bg-pal-950',
        'shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]',
        'transition-[height] duration-300 ease-in-out',
        // Mobile: stretch edge-to-edge with small margins, above the FAB
        // Desktop: fixed size bottom-right corner
        'left-3 right-3 bottom-[5rem] sm:left-auto sm:bottom-6 sm:right-6 sm:w-[390px]',
        isMinimized ? 'h-[46px]' : 'h-[min(78vh,560px)] sm:h-[min(500px,calc(100vh-5rem))]'
      )}
    >
      {/* ── Top accent line ── */}
      <div className="h-[2px] w-full shrink-0 bg-gradient-to-r from-amber-500 via-amber-400 to-term-green" />

      {/* ── Titlebar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-3 py-2">
        {/* Left: window dots + path */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" />
          </span>
          <span className="text-xs text-pal-400">
            <span className="text-term-green">mahmoud-ai</span>
            <span className="text-pal-500">:</span>~/assistant
          </span>
          {isStreaming && <span className="text-[10px] text-amber-400">…gen</span>}
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-0.5">
          <button onClick={handleClear} title="Clear chat" aria-label="Clear chat"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-pal-400 transition-colors hover:bg-red-500/10 hover:text-red-400 focus:outline-none">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setIsMinimized((v) => !v)} aria-label="Minimize"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-pal-400 transition-colors hover:bg-white/5 hover:text-pal-100 focus:outline-none">
            <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isMinimized && 'rotate-180')} />
          </button>
          <button onClick={handleClose} aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-pal-400 transition-colors hover:bg-white/5 hover:text-pal-100 focus:outline-none">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* ── Messages ── */}
          <ScrollArea className="flex-1 px-3 py-3 sm:px-3">
            <div className="space-y-4">
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                const showCursor = isStreaming && isLast && msg.role === 'assistant' && msg.content !== '';

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-2.5 animate-in fade-in-0 slide-in-from-bottom-3 duration-300',
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    {/* Bot mini-avatar */}
                    {msg.role === 'assistant' && (
                      <div className="mt-1 h-7 w-7 shrink-0 rounded-full border border-amber-400/20 overflow-hidden">
                        <img src="/ai-avatar.jpg" alt="AI" className="h-full w-full object-cover" />
                      </div>
                    )}

                    <div className={cn('flex max-w-[85%] flex-col gap-1 sm:max-w-[78%]', msg.role === 'user' && 'items-end')}>
                      {/* User bubble */}
                      {msg.role === 'user' ? (
                        <div className="rounded-md rounded-tr-sm border border-amber-400/30 bg-amber-400/10 px-3.5 py-2">
                          <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-amber-50">
                            {msg.content}
                          </p>
                        </div>
                      ) : (
                        /* Bot bubble */
                        <div className="rounded-md rounded-tl-sm border border-white/[0.1] bg-pal-900/60 px-3.5 py-2.5">
                          {msg.content === '' ? (
                            <TypingDots />
                          ) : (
                            <>
                              <BotMarkdown content={msg.content} />
                              {showCursor && (
                                <span className="ml-0.5 inline-block h-3.5 w-[3px] animate-pulse rounded-sm bg-amber-400 align-middle" />
                              )}
                            </>
                          )}
                        </div>
                      )}

                      <span className="px-1 text-[10px] text-pal-400">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                );
              })}

              {/* Thinking dots */}
              {isLoading && (
                <div className="flex gap-2.5 animate-in fade-in-0 duration-200">
                  <div className="mt-1 h-7 w-7 shrink-0 rounded-full border border-amber-400/20 overflow-hidden">
                    <img src="/ai-avatar.jpg" alt="AI" className="h-full w-full object-cover" />
                  </div>
                  <div className="rounded-md rounded-tl-sm border border-white/[0.1] bg-pal-900/60 px-4 py-3">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* ── Follow-up suggestion chips ── */}
              {(followUps.length > 0 || isLoadingFollowUps) && !isLoading && !isStreaming && (
                <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-400 ml-9">
                  {isLoadingFollowUps ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="h-1 w-1 animate-bounce rounded-full bg-amber-400/60" style={{ animationDelay: '0ms' }} />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-amber-400/60" style={{ animationDelay: '150ms' }} />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-amber-400/60" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="flex items-center gap-1 text-[10px] text-pal-400">
                        <CornerDownRight className="h-2.5 w-2.5 text-amber-400" />
                        follow-up
                      </p>
                      {followUps.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="block w-full rounded-sm border border-white/[0.1] bg-white/[0.02] px-3 py-1.5 text-left text-[11px] text-pal-200 transition-colors duration-150 hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:text-amber-200 focus:outline-none"
                        >
                          <span className="mr-1.5 text-amber-400/70">&gt;</span>
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Quick prompt chips ── */}
              {showPrompts && (
                <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 pt-1">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] text-pal-400">
                    <span className="text-amber-400">$</span> quick-questions
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="rounded-sm border border-white/[0.1] bg-white/[0.02] px-2.5 py-2 text-left text-[11px] text-pal-200 transition-colors duration-150 hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:text-amber-200 focus:outline-none"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* ── Input area ── */}
          <div className="shrink-0 border-t border-white/[0.08] bg-pal-950 px-3 pb-4 pt-2 sm:pb-3">
            <div className="flex items-end gap-2">
              <span className="pb-3 pl-1 text-amber-400" aria-hidden>&gt;</span>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                }}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isStreaming}
                placeholder="ask me anything…"
                rows={1}
                className="min-h-[44px] max-h-[100px] flex-1 resize-none rounded-sm border border-white/[0.1] bg-white/[0.03] px-3 py-3 font-mono leading-relaxed text-pal-50 placeholder:text-pal-400 transition-colors duration-150 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/15 disabled:cursor-not-allowed disabled:opacity-50"
                // 16px prevents iOS Safari from auto-zooming on focus
                style={{ fontSize: '16px' }}
              />

              <button
                onClick={() => sendMessage()}
                disabled={isLoading || isStreaming || !input.trim()}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-amber-400/40 bg-amber-400/15 text-amber-300 transition-colors duration-150 hover:bg-amber-400/25 hover:text-amber-200 active:scale-95 focus:outline-none disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Footer — hide on mobile to save space */}
            <p className="mt-2 hidden select-none text-center text-[10px] text-pal-400 sm:block">
              <span className="text-pal-500"># </span>powered by mahmoud · enter to send
            </p>
          </div>
        </>
      )}
    </div>
  );
}
