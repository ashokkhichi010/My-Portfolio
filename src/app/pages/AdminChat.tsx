import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { ConversationPanel } from '../components/chat/ConversationPanel';
import { AdminLeadSidebar } from '../components/chat/AdminLeadSidebar';
import { IncomingHandoverModal } from '../components/chat/IncomingHandoverModal';
import { useAdminChatController } from '../hooks/useAdminChatController';

export const AdminChat = () => {
  const {
    leads,
    selectedSessionId,
    setSelectedSessionId,
    selectedLead,
    draft,
    setDraft,
    incomingLead,
    submitLiveReply,
    handleLogout,
    acceptLead,
    closeIncomingLead,
  } = useAdminChatController();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔒 Lock background scroll when sidebar open (mobile)
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0b0f19] text-white">

      {/* 🔥 Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 lg:hidden">
        <span className="text-sm">Admin Chat</span>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={20} />
        </button>
      </div>

      {/* 🔥 Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-2 p-2 sm:p-4">

        {/* 💻 Desktop Sidebar */}
        <div className="hidden lg:block min-h-0">
          <AdminLeadSidebar
            leads={leads}
            selectedSessionId={selectedSessionId}
            onSelect={(id) => {
              setSelectedSessionId(id);
              setIsSidebarOpen(false);
            }}
            onLogout={handleLogout}
          />
        </div>

        {/* 💬 Chat Area */}
        <div className="min-h-0">
          <ConversationPanel
            title={selectedLead?.visitorName || 'Anonymous visitor'}
            subtitle={selectedLead?.visitorEmail}
            messages={selectedLead?.messages ?? []}
            draft={draft}
            onDraftChange={setDraft}
            onSubmit={submitLiveReply}
            inputPlaceholder="Type your reply..."
            submitLabel="Reply"
            isVisitorConversation={false}
          />
        </div>
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="w-[80%] max-w-xs h-full bg-[#0f172a] shadow-xl transform transition-transform duration-300">
            <AdminLeadSidebar
              leads={leads}
              selectedSessionId={selectedSessionId}
              onSelect={(id) => {
                setSelectedSessionId(id);
                setIsSidebarOpen(false);
              }}
              onLogout={handleLogout}
              onCloseSidebar={() => setIsSidebarOpen(false)} // 👈 ADD THIS
            />
          </div>
        </div>
      )}

      {/* 🔔 Incoming Lead Modal */}
      <IncomingHandoverModal
        isOpen={Boolean(incomingLead)}
        visitorName={incomingLead?.visitorName || ''}
        latestMessage={incomingLead?.latestMessage || ''}
        onDismiss={closeIncomingLead}
        onAccept={() => incomingLead && acceptLead(incomingLead.sessionId)}
      />
    </div>
  );
};