export type AdminLeadStatus = 'AI' | 'HANDOVER_REQUESTED' | 'LIVE' | 'ADMIN_BUSY';

export const AdminStatusPill = ({ status }: { status: AdminLeadStatus }) => {
  const classes =
    status === 'HANDOVER_REQUESTED'
      ? 'border-rose-300/20 bg-rose-300/12 text-rose-50'
      : status === 'LIVE'
        ? 'border-emerald-300/20 bg-emerald-300/12 text-emerald-50'
        : status === 'ADMIN_BUSY'
          ? 'border-amber-300/20 bg-amber-300/12 text-amber-50'
          : 'border-white/10 bg-white/[0.04] text-white/60';

  return <span className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.2em] ${classes}`}>{status}</span>;
};
