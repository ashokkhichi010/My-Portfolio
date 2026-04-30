import { useEffect, useRef } from 'react';
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
  isVisitorConversation?: boolean,
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
  // submitLabel,
  disabled = false,
  footer,
  isVisitorConversation = false,
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

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

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
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 backdrop-blur">

      {/* Header */}
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
        className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 space-y-4"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} isVisitorConversation={isVisitorConversation} />
        ))}
      </div>

      {footer && <div className="px-4 pb-2">{footer}</div>}

      <div className="relative flex items-end gap-2 sm:gap-3 bg-white/5 rounded-b-xl px-3 py-2">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown} // Added the key listener
          placeholder={inputPlaceholder}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent outline-none text-white text-[16px] resize-none min-h-[24px] max-h-72 py-1 placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={disabled || !draft.trim()}
          className="flex items-center justify-center bg-blue-600 text-white w-10 h-10 rounded-full hover:bg-blue-500 disabled:bg-[#2a2b2c] disabled:text-gray-600 transition-all flex-shrink-0"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isVisitorConversation }: { message: ConversationMessage, isVisitorConversation: boolean }) => {
  let position = "justify-end";
  let tag = "You";
  let color = "bg-white/5 text-white";

  switch (message.role) {
    case "admin":
      if (isVisitorConversation) {
        position = "justify-start";
        tag = "Admin";
        color = "bg-white/5 text-white";
      } else {
        position = "justify-end";
        tag = "You";
        color = "bg-blue-600 text-white";
      }
      break;
    case "visitor":
      if (isVisitorConversation) {
        position = "justify-end";
        tag = "You";
        color = "bg-blue-600 text-white";
      } else {
        position = "justify-start";
        tag = "Visitor";
        color = "bg-white/5 text-white";
      }
      break;
    case "assistant":
      if (isVisitorConversation) {
        position = "justify-start";
        tag = "AI Assistant";
        color = "bg-white/5 text-white";
      } else {
        position = "justify-end";
        tag = "AI Assistant";
        color = "bg-blue-600 text-white";
      }
      break;
  }



  return (
    <div className={`flex ${position}`}>
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className="text-[10px] text-white/40 mb-1"> {tag} </div>
        <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm ${color}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};