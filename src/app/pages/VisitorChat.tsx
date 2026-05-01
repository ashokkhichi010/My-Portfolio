import { SolarBackground } from '../components/SolarBackground';
import { ConversationPanel } from '../components/chat/ConversationPanel';
import { useVisitorChatController } from '../hooks/useVisitorChatController';

export const VisitorChat = () => {
  const { chat, draft, setDraft, submitMessage, footer, title, subtitle, submitLabel } = useVisitorChatController();

  const actionButton = (
    <button
      type="button"
      onClick={() => { }}
      className="rounded-full border border-rose-300/20 bg-rose-300/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-50 transition hover:bg-rose-300/25"
    >
      Go to Home
    </button>
  );

  return (
    <div className="h-[100dvh] flex flex-col text-white">

      <SolarBackground />

      <div className="flex-1 min-h-0 w-full max-w-8xl mx-auto px-2 sm:px-4 py-2 sm:py-2">
        <ConversationPanel
          title={title}
          subtitle={subtitle}
          messages={chat.messages}
          draft={draft}
          onDraftChange={setDraft}
          onSubmit={submitMessage}
          inputPlaceholder="Type your message..."
          submitLabel={submitLabel}
          disabled={chat.connectionStatus !== 'connected'}
          footer={footer}
          isVisitorConversation={true}
          isTyping={chat.isTyping && chat.handoverStatus === 'AI'}
          typingLabel="AI is typing..."
          statusBadge={actionButton}
        />
      </div>
    </div>
  );
};
