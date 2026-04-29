import { PhoneIncoming, X } from 'lucide-react';

type IncomingHandoverModalProps = {
  isOpen: boolean;
  visitorName: string;
  latestMessage: string;
  onAccept: () => void;
  onDismiss: () => void;
};

export const IncomingHandoverModal = ({
  isOpen,
  visitorName,
  latestMessage,
  onAccept,
  onDismiss,
}: IncomingHandoverModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-rose-300/25 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),transparent_42%),linear-gradient(180deg,rgba(11,14,24,0.96),rgba(7,10,18,0.98))] p-6 text-white shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-400/15 text-rose-100">
            <PhoneIncoming size={22} />
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.28em] text-rose-200/80">Incoming handover</p>
        <h3 className="mt-3 text-2xl text-white">{visitorName || 'New visitor lead'}</h3>
        <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
          {latestMessage || 'The visitor is waiting for a human reply.'}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
