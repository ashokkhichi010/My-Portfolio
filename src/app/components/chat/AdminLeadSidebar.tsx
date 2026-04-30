import { useState } from 'react';
import { UserRound, LogOut, X } from 'lucide-react';
import { AdminStatusPill, type AdminLeadStatus } from './AdminStatusPill';
import type { ConversationMessage } from './ConversationPanel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';

export type AdminLeadItem = {
  sessionId: string;
  status: AdminLeadStatus;
  visitorName: string;
  visitorEmail: string;
  latestMessage: string;
  messages: ConversationMessage[];
};

interface Props {
  leads: AdminLeadItem[];
  selectedSessionId: string | null;
  onSelect: (sessionId: string) => void;
  onLogout: () => void;
  onCloseSidebar?: () => void; // 👈 new
}

export const AdminLeadSidebar = ({
  leads,
  selectedSessionId,
  onSelect,
  onLogout,
  onCloseSidebar,
}: Props) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <aside className="flex h-full flex-col rounded-2xl bg-[#0f172a] text-white">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Visitors</h2>

        {/* Close (only useful in mobile drawer) */}
        {onCloseSidebar && (
          <button
            onClick={onCloseSidebar}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Leads */}
      <div className="flex-1 overflow-y-auto px-3 space-y-3 py-3">
        {leads.map((lead) => {
          const isActive = lead.sessionId === selectedSessionId;

          return (
            <div
              key={lead.sessionId}
              onClick={() => onSelect(lead.sessionId)}
              className={`cursor-pointer rounded-xl p-4 transition ${isActive
                  ? 'bg-gradient-to-r from-blue-600/30 to-blue-500/10 border border-blue-500/30'
                  : 'bg-white/5 hover:bg-white/10'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500/20">
                  <UserRound size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {lead.visitorName || 'Anonymous'}
                    </p>
                    <AdminStatusPill status={lead.status} />
                  </div>

                  <p className="text-xs text-white/50 mt-1 truncate">
                    {lead.latestMessage || 'No messages'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {leads.length === 0 && (
          <div className="text-center text-white/40 text-sm mt-10">
            No conversations yet
          </div>
        )}
      </div>

      {/* 🔽 Logout at bottom */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setConfirmLogout(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/90 hover:bg-red-600 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Confirmation */}
      <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <DialogContent className="bg-[#3c3c3c]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <button
              onClick={() => setConfirmLogout(false)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Cancel
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};