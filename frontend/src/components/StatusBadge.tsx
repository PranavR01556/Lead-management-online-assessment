import type { LeadStatus } from '../types/lead';

const dots: Record<LeadStatus, string> = {
  New:       '●',
  Contacted: '●',
  Qualified: '●',
  Lost:      '●',
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`status-badge ${status}`}>
      <span style={{ fontSize: 8 }}>{dots[status]}</span>
      {status}
    </span>
  );
}
