import type { ReactNode } from 'react';

export const ChatStatusBanner = ({
  children,
  tone,
}: {
  children: ReactNode;
  tone: 'success' | 'warning' | 'danger';
}) => {
  const styles =
    tone === 'success'
      ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-50'
      : tone === 'warning'
        ? 'border-amber-300/20 bg-amber-300/10 text-amber-50'
        : 'border-rose-300/20 bg-rose-300/10 text-rose-50';

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>{children}</div>;
};
