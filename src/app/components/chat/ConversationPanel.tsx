import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Send } from 'lucide-react';

export type ConversationMessage = {
  id: string;
  role: 'visitor' | 'assistant' | 'admin';
  content: string;
  createdAt: string;
};

interface ConversationPanelProps {
  title: string;
  subtitle?: string;
  statusBadge?: ReactNode;
  messages: ConversationMessage[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  inputPlaceholder: string;
  submitLabel: string;
  disabled?: boolean;
  footer?: ReactNode;
  emptyState?: ReactNode;
}

export const ConversationPanel = ({
  title,
  subtitle,
  statusBadge,
  messages,
  draft,
  onDraftChange,
  onSubmit,
  inputPlaceholder,
  submitLabel,
  disabled = false,
  footer,
  emptyState,
}: ConversationPanelProps) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const previousCount = useRef(messages.length);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      setIsPinnedToBottom(distanceFromBottom < 80);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollAreaRef.current;
    const hasNewMessages = messages.length > previousCount.current;
    previousCount.current = messages.length;

    if (!container || !hasNewMessages || !isPinnedToBottom) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isPinnedToBottom]);

  const renderedEmpty = useMemo(
    () =>
      emptyState ?? (
        <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm text-white/45">
          No messages yet.
        </div>
      ),
    [emptyState],
  );

  return (
    <div className="flex h-full min-h-0 flex-col rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/8 px-5 py-4">
        <div>
          <h2 className="text-xl text-white md:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-white/58">{subtitle}</p> : null}
        </div>
        {statusBadge}
      </div>

      <div ref={scrollAreaRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
        {messages.length
          ? messages.map((message) => <MessageBubble key={message.id} message={message} />)
          : renderedEmpty}
      </div>

      {footer ? <div className="px-5 pb-2">{footer}</div> : null}

      <form className="flex gap-3 border-t border-white/8 px-5 py-4" onSubmit={onSubmit}>
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={inputPlaceholder}
          disabled={disabled}
          className="min-h-[92px] flex-1 rounded-3xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !draft.trim()}
          className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-3xl bg-cyan-300 px-5 py-4 text-sm font-medium text-slate-950 transition disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
        >
          <Send size={16} />
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

const MessageBubble = ({ message }: { message: ConversationMessage }) => {
  const isVisitor = message.role === 'visitor';
  const isAdmin = message.role === 'admin';

  return (
    <div className={`flex ${isVisitor || isAdmin ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-6 ${
          isAdmin
            ? 'rounded-br-md bg-cyan-300 text-slate-950'
            : isVisitor
              ? 'rounded-br-md bg-emerald-300 text-slate-950'
              : 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/88'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
