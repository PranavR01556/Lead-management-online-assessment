import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { leadsApi } from '../services/leadsApi';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import type { Lead } from '../types/lead';

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead,    setLead]    = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    leadsApi.getLead(Number(id))
      .then(setLead)
      .catch(() => setError('Lead not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <>
      <Header
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Leads', to: '/leads' },
          { label: 'Lead Details' },
        ]}
      />

      <div className="page-body">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Lead Details</h1>
            <p className="page-subtitle">View complete information about a lead.</p>
          </div>
          {lead && (
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to={`/leads/${lead.id}/edit`} className="btn btn-ghost btn-sm">
                ✏ Edit
              </Link>
              <Link to="/leads" className="btn btn-ghost btn-sm">← Back</Link>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : error ? (
          <div className="alert-banner error">{error}</div>
        ) : lead ? (
          <div className="card" style={{ maxWidth: 540 }}>
            <div style={{ padding: '20px 24px', display: 'grid', gap: 16 }}>
              {[
                ['Full Name',    lead.name],
                ['Email',        lead.email],
                ['Phone',        lead.phone],
                ['Source',       lead.source],
                ['Created Date', formatDate(lead.created_at)],
                ['Last Updated', formatDate(lead.updated_at)],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'start' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'start' }}>
                <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>Status</span>
                <StatusBadge status={lead.status} />
              </div>
              {lead.notes && (
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'start' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>Notes</span>
                  <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{lead.notes}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
