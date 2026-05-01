import { useEffect, useMemo, useRef } from 'react';
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
  isVisitorConversation?: boolean;
  isTyping?: boolean;
  typingLabel?: string;
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
  isVisitorConversation = false,
  isTyping = false,
  typingLabel = 'AI is typing...',
}: ConversationPanelProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to shrink if text is deleted
      textareaRef.current.style.height = 'auto';
      // Set height to match the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [draft]); // Triggered every time the draft text changes

  const displayItems = useMemo(() => {
    const items: Array<
      | { type: 'date'; key: string; label: string }
      | { type: 'message'; key: string; message: ConversationMessage }
    > = [];

    const dates: string[] = [];

    for (const message of messages) {
      const dayKey = new Date(message.createdAt).toDateString();
      const isDateExists = dates.includes(dayKey);

      if (!isDateExists) {
        dates.push(dayKey),
          items.push({
            type: 'date',
            key: dayKey,
            label: formatDateDivider(message.createdAt),
          });
      }

      items.push({
        type: 'message',
        key: message.id,
        message,
      });
    }

    return items;
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [displayItems, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter is pressed without the Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added
      if (draft.trim() && !disabled) {
        onSubmit(e as any); // Trigger your submit function
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 h-12 border-b border-white/10">
        <div className="min-w-0">
          <h2 className="text-sm truncate">{title}</h2>
          {subtitle && <p className="text-xs text-white/40 truncate">{subtitle}</p>}
        </div>
        {statusBadge}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="chat-scrollbar flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-6"
      >
        <div className="space-y-4">
          {displayItems.map((item) =>
            item.type === 'date' ? (
              <DateDivider key={item.key} label={item.label} />
            ) : (
              <MessageBubble
                key={item.key}
                message={item.message}
                isVisitorConversation={isVisitorConversation}
              />
            ),
          )}
          {isTyping ? <TypingIndicator isVisitorConversation={isVisitorConversation} label={typingLabel} /> : null}
        </div>
      </div>

      {footer && <div className="px-4 pb-2">{footer}</div>}

      <form onSubmit={onSubmit} className="relative flex items-end gap-2 rounded-b-xl bg-white/5 px-3 py-2 sm:gap-3">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={inputPlaceholder}
          disabled={disabled}
          rows={1}
          className="min-h-[24px] max-h-72 flex-1 resize-none bg-transparent py-1 text-[16px] text-white outline-none placeholder-gray-500"
        />

        <button
          type="submit"
          aria-label={submitLabel}
          title={submitLabel}
          disabled={disabled || !draft.trim()}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:bg-[#2a2b2c] disabled:text-gray-600"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

const DateDivider = ({ label }: { label: string }) => (
  <div className="flex justify-center">
    <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45 backdrop-blur-sm">
      {label}
    </div>
  </div>
);

const TypingIndicator = ({
  isVisitorConversation,
  label,
}: {
  isVisitorConversation: boolean;
  label: string;
}) => (
  <div className={`flex ${isVisitorConversation ? 'justify-start' : 'justify-end'}`}>
    <div className="max-w-[85%] sm:max-w-[70%]">
      <div className="mb-1 text-[10px] text-white/40">{isVisitorConversation ? 'AI Assistant' : 'You'}</div>
      <div className="inline-flex items-center gap-2 rounded-2xl bg-white/6 px-4 py-3 text-sm text-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.24)]">
        <span>{label}</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300/90 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300/75" />
        </span>
      </div>
    </div>
  </div>
);

const MessageBubble = ({
  message,
  isVisitorConversation,
}: {
  message: ConversationMessage;
  isVisitorConversation: boolean;
}) => {
  let position = 'justify-end';
  let tag = 'You';
  let color = 'bg-white/5 text-white';

  switch (message.role) {
    case 'admin':
      if (isVisitorConversation) {
        position = 'justify-start';
        tag = 'Admin';
        color = 'bg-white/5 text-white';
      } else {
        position = 'justify-end';
        tag = 'You';
        color = 'bg-blue-600 text-white';
      }
      break;
    case 'visitor':
      if (isVisitorConversation) {
        position = 'justify-end';
        tag = 'You';
        color = 'bg-blue-600 text-white';
      } else {
        position = 'justify-start';
        tag = 'Visitor';
        color = 'bg-white/5 text-white';
      }
      break;
    case 'assistant':
      if (isVisitorConversation) {
        position = 'justify-start';
        tag = 'AI Assistant';
        color = 'bg-white/5 text-white';
      } else {
        position = 'justify-end';
        tag = 'AI Assistant';
        color = 'bg-blue-600 text-white';
      }
      break;
  }

  return (
    <div className={`flex ${position}`}>
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className="mb-1 text-[10px] text-white/40">{tag}</div>
        <div className={`rounded-2xl px-3 py-2 text-sm shadow-[0_12px_30px_rgba(15,23,42,0.22)] sm:px-4 sm:py-3 ${color}`}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          <div className="mt-2 flex justify-end text-[11px] text-white/45">
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

const formatMessageTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));

const formatDateDivider = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
