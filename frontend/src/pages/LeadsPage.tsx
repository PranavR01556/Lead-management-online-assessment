import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { leadsApi } from '../services/leadsApi';
import StatusBadge from '../components/StatusBadge';
import Header from '../components/Header';
import type { Lead, LeadStatus } from '../types/lead';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const PAGE_SIZE = 10;

export default function LeadsPage() {
  const [leads,         setLeads]         = useState<Lead[]>([]);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [statusFilter,  setStatusFilter]  = useState('');
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');
  const [currentPage,   setCurrentPage]   = useState(1);
  const [selectedIds,   setSelectedIds]   = useState<number[]>([]);

  // Fetch leads on mount and search changes
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await leadsApi.getLeads({ search: searchTerm });
      setLeads(res.data);
    } catch {
      setError('Failed to load leads. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Pagination
  const totalPages = Math.ceil(leads.length / PAGE_SIZE);
  const paginated  = leads.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  const handleBulkAction = (status: string) => {
    console.log('bulk action', { selectedIds, status });
  };

  const handleDelete = (id: number) => {
    // TODO: Confirm deletion, call leadsApi.deleteLead(id), then refresh the list
    alert('Delete not implemented yet — complete the backend first!');
    console.log('delete lead', id);
  };

  return (
    <>
      <Header breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Leads' }]} />

      <div className="page-body">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              Leads
              <span className="chip-count">{leads.length}</span>
            </h1>
            <p className="page-subtitle">View all leads with search, filters and quick actions.</p>
          </div>
          <Link to="/leads/new" className="btn btn-primary">
            <Plus size={15} /> Add Lead
          </Link>
        </div>

        <div className="card">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-wrap">
              <Search size={14} className="search-icon" />
              <input
                id="lead-search"
                type="text"
                className="search-input"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              id="status-filter"
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="toolbar-spacer" />

            {/* Bulk Actions */}
            <div className="bulk-actions-wrap">
              {selectedIds.length > 0 && (
                <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>
                  {selectedIds.length} selected
                </span>
              )}
              <select
                id="bulk-action-select"
                className="bulk-select"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) handleBulkAction(e.target.value);
                }}
              >
                <option value="" disabled>Bulk Actions</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>Mark as {s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="loading-state"><div className="spinner" /></div>
          ) : error ? (
            <div style={{ padding: 24 }}>
              <div className="alert-banner error">{error}</div>
            </div>
          ) : leads.length === 0 ? (
            <div className="empty-state">
              <Filter size={40} />
              <p>No leads found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th className="cb-col">
                      <input
                        type="checkbox"
                        className="row-checkbox"
                        onChange={() => {}}
                        checked={false}
                        title="Select all"
                      />
                    </th>
                    <th className="td-number">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((lead, idx) => (
                    <tr key={lead.id}>
                      <td className="cb-col">
                        <input
                          type="checkbox"
                          className="row-checkbox"
                          checked={selectedIds.includes(lead.id)}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="td-number">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                      <td className="td-name">
                        <Link to={`/leads/${lead.id}`} className="text-link">{lead.name}</Link>
                      </td>
                      <td className="td-email">{lead.email}</td>
                      <td className="td-phone">{lead.phone}</td>
                      <td><StatusBadge status={lead.status} /></td>
                      <td className="td-date">{formatDate(lead.created_at)}</td>
                      <td>
                        <div className="actions-cell">
                          <Link to={`/leads/${lead.id}`} title="View">
                            <button className="action-btn" title="View lead">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>
                          </Link>
                          <Link to={`/leads/${lead.id}/edit`} title="Edit">
                            <button className="action-btn" title="Edit lead">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                          </Link>
                          <button
                            className="action-btn action-btn--danger"
                            title="Delete lead"
                            onClick={() => handleDelete(lead.id)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {!loading && !error && leads.length > 0 && (
            <div className="table-footer">
              <span>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, leads.length)} of {leads.length} leads
              </span>
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >‹</button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-btn${p === currentPage ? ' active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >{p}</button>
                ))}
                {totalPages > 5 && <span style={{ padding: '0 4px', color: 'var(--text-muted)' }}>…</span>}
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >›</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
