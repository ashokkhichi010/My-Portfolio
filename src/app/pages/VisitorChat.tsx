import { SolarBackground } from '../components/SolarBackground';
import { ConversationPanel } from '../components/chat/ConversationPanel';
import { useVisitorChatController } from '../hooks/useVisitorChatController';

export const VisitorChat = () => {
  const { chat, draft, setDraft, submitMessage, footer, title, subtitle, submitLabel } = useVisitorChatController();

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0b0f19] text-white">

      <SolarBackground />

      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
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
        />
      </div>
    </div>
  );
};
