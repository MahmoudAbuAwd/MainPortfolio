'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, ChevronDown, Bot, Sparkles, Trash2, Zap, CornerDownRight } from 'lucide-react';
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
          <p className="mb-2 last:mb-0 text-[13px] leading-relaxed text-zinc-100">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 list-disc space-y-0.5 pl-4 text-[13px] text-zinc-100">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal space-y-0.5 pl-4 text-[13px] text-zinc-100">{children}</ol>
        ),
        li: ({ children }) => <li className="text-[13px] text-zinc-100">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-purple-300 underline underline-offset-2 hover:text-purple-200 text-[13px]">
            {children}
          </a>
        ),
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
        h3: ({ children }) => <h3 className="mb-1 mt-2 text-xs font-semibold text-zinc-100">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-purple-400/60 pl-3 text-[13px] italic text-zinc-300">
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
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400/60"
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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(147,51,234,0.5)] transition-all duration-200 hover:scale-105 focus:outline-none"
        style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
    );
  }

  /* ─────────────────────────────────────
     Chat window
  ───────────────────────────────────── */
  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex w-[390px] flex-col overflow-hidden rounded-2xl',
        'border border-white/[0.07]',
        'shadow-[0_30px_80px_-10px_rgba(88,28,135,0.35),0_0_0_1px_rgba(255,255,255,0.04)]',
        'transition-[height] duration-300 ease-in-out',
        isMinimized ? 'h-[64px]' : 'h-[min(500px,calc(100vh-5rem))]'
      )}
      style={{ background: 'linear-gradient(160deg, #13082b 0%, #0e0c1e 40%, #0a0a14 100%)' }}
    >
      {/* ── Rainbow top line ── */}
      <div className="h-[2px] w-full shrink-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />

      {/* ── Header ── */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3"
        style={{ background: 'linear-gradient(180deg, rgba(88,28,135,0.18) 0%, transparent 100%)' }}
      >
        {/* Left: avatar + name */}
        <div className="flex items-center gap-3">
          {/* Avatar with glowing ring */}
          <div className="relative">
            <div className="h-10 w-10 rounded-full p-[1.5px]"
              style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}>
              <div className="flex h-full w-full items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #1a0a30, #120820)' }}>
                <Bot className="h-4.5 w-4.5 text-purple-300" />
              </div>
            </div>
            {/* Glow behind avatar */}
            <div className="absolute inset-0 -z-10 animate-pulse rounded-full blur-md"
              style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)' }} />
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#13082b] bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          </div>

          <div>
            <p className="text-sm font-semibold leading-none"
              style={{ background: 'linear-gradient(90deg, #fff 0%, #d8b4fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mahmoud AI
            </p>
            <p className="mt-0.5 text-[11px]">
              {isStreaming
                ? <span className="text-purple-400">Generating…</span>
                : <span className="text-zinc-500">AI Portfolio Assistant</span>
              }
            </p>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-0.5">
          <button onClick={handleClear} title="Clear chat" aria-label="Clear chat"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-red-500/10 hover:text-red-400 focus:outline-none">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setIsMinimized((v) => !v)} aria-label="Minimize"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/5 hover:text-white focus:outline-none">
            <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isMinimized && 'rotate-180')} />
          </button>
          <button onClick={handleClose} aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/5 hover:text-white focus:outline-none">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* ── Messages ── */}
          <ScrollArea className="flex-1 px-3 py-3">
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
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-500/20 bg-purple-950/60">
                        <Bot className="h-3.5 w-3.5 text-purple-400" />
                      </div>
                    )}

                    <div className={cn('flex max-w-[78%] flex-col gap-1', msg.role === 'user' && 'items-end')}>
                      {/* User bubble */}
                      {msg.role === 'user' ? (
                        <div
                          className="rounded-2xl rounded-tr-sm px-3.5 py-2.5"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                            boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
                          }}
                        >
                          <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-white">
                            {msg.content}
                          </p>
                        </div>
                      ) : (
                        /* Bot bubble */
                        <div
                          className="rounded-2xl rounded-tl-sm px-3.5 py-2.5"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          {msg.content === '' ? (
                            <TypingDots />
                          ) : (
                            <>
                              <BotMarkdown content={msg.content} />
                              {showCursor && (
                                <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse rounded-sm bg-purple-400 align-middle" />
                              )}
                            </>
                          )}
                        </div>
                      )}

                      <span className="px-1 text-[10px] text-zinc-500">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                );
              })}

              {/* Thinking dots */}
              {isLoading && (
                <div className="flex gap-2.5 animate-in fade-in-0 duration-200">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-500/20 bg-purple-950/60">
                    <Bot className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* ── Follow-up suggestion chips ── */}
              {(followUps.length > 0 || isLoadingFollowUps) && !isLoading && !isStreaming && (
                <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-400 ml-9">
                  {isLoadingFollowUps ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="h-1 w-1 animate-bounce rounded-full bg-purple-500/60" style={{ animationDelay: '0ms' }} />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-purple-500/60" style={{ animationDelay: '150ms' }} />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-purple-500/60" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="flex items-center gap-1 text-[10px] text-zinc-400">
                        <CornerDownRight className="h-2.5 w-2.5 text-purple-400" />
                        Follow-up questions
                      </p>
                      {followUps.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="block w-full rounded-xl px-3 py-1.5 text-left text-[12px] text-zinc-200 transition-all duration-150 hover:text-white focus:outline-none"
                          style={{
                            background: 'rgba(147,51,234,0.06)',
                            border: '1px solid rgba(147,51,234,0.18)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(147,51,234,0.13)';
                            e.currentTarget.style.borderColor = 'rgba(147,51,234,0.38)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(147,51,234,0.06)';
                            e.currentTarget.style.borderColor = 'rgba(147,51,234,0.18)';
                          }}
                        >
                          <span className="mr-1.5 text-purple-500/70">↗</span>
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
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Zap className="h-3 w-3 text-purple-500" />
                    Quick questions
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="rounded-xl px-2.5 py-2 text-left text-[11px] text-zinc-300 transition-all duration-150 hover:text-white focus:outline-none"
                        style={{
                          background: 'rgba(147,51,234,0.06)',
                          border: '1px solid rgba(147,51,234,0.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(147,51,234,0.12)';
                          e.currentTarget.style.borderColor = 'rgba(147,51,234,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(147,51,234,0.06)';
                          e.currentTarget.style.borderColor = 'rgba(147,51,234,0.2)';
                        }}
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
          <div
            className="shrink-0 px-3 pb-3 pt-2"
            style={{
              background: 'linear-gradient(0deg, rgba(10,10,20,0.95) 0%, transparent 100%)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-end gap-2">
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
                placeholder="Ask me anything…"
                rows={1}
                className="min-h-[44px] max-h-[100px] flex-1 resize-none rounded-xl px-3.5 py-3 text-[13px] leading-relaxed text-white placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  // focus handled via onFocus/onBlur for inline style
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(147,51,234,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(147,51,234,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />

              <button
                onClick={() => sendMessage()}
                disabled={isLoading || isStreaming || !input.trim()}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-150 hover:scale-105 focus:outline-none disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled)
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.35)';
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Footer */}
            <p className="mt-2 select-none text-center text-[10px] text-zinc-400">
              <Sparkles className="mr-1 inline h-2.5 w-2.5 text-purple-400" />
              Powered by Mahmoud · Enter to send
            </p>
          </div>
        </>
      )}
    </div>
  );
}
