import { getOpenStatus } from '@/lib/time-utils';

export default function OpenStatusBadge() {
  const status = getOpenStatus();
  return (
    <span
      className={status.isOpen ? 'badge badge-open' : 'badge badge-closed'}
      aria-label={status.statusLabel}
      role="status"
    >
      {status.statusLabel}
    </span>
  );
}
