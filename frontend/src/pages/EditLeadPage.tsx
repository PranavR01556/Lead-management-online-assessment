import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { leadsApi } from '../services/leadsApi';
import Header from '../components/Header';
import type { LeadFormData, LeadStatus } from '../types/lead';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const SOURCES = ['Website', 'Referral', 'Instagram', 'Walk-in', 'Other'];

export default function EditLeadPage() {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const [form,    setForm]    = useState<LeadFormData | null>(null);
  const [errors,  setErrors]  = useState<Partial<LeadFormData>>({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [apiErr,  setApiErr]  = useState('');

  useEffect(() => {
    leadsApi.getLead(Number(id))
      .then((lead) => {
        setForm({
          name:   lead.name,
          email:  lead.email,
          phone:  lead.phone,
          status: lead.status,
          source: lead.source,
          notes:  lead.notes,
        });
      })
      .catch(() => setApiErr('Lead not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const e: Partial<LeadFormData> = {};
    if (!form?.name.trim())  e.name  = 'Name is required';
    if (!form?.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form?.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    setApiErr('');
    try {
      await leadsApi.updateLead(Number(id), form);
      navigate('/leads', { state: { success: 'Lead updated successfully!' } });
    } catch (err: any) {
      setApiErr('Failed to update lead. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const set = (field: keyof LeadFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => f ? { ...f, [field]: e.target.value } : f);
      setErrors((er) => ({ ...er, [field]: undefined }));
    };

  if (loading) return (
    <>
      <Header breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Leads', to: '/leads' }, { label: 'Edit Lead' }]} />
      <div className="page-body"><div className="loading-state"><div className="spinner" /></div></div>
    </>
  );

  return (
    <>
      <Header
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Leads', to: '/leads' },
          { label: 'Edit Lead' },
        ]}
      />

      <div className="page-body">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Edit Lead</h1>
            <p className="page-subtitle">Update existing lead information.</p>
          </div>
        </div>

        <div className="card form-card">
          {apiErr && <div style={{ padding: '16px 20px 0' }}><div className="alert-banner error">{apiErr}</div></div>}

          {form && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-section-title">Lead Information</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-name">Full Name <span>*</span></label>
                  <input
                    id="edit-name"
                    className={`form-input${errors.name ? ' error' : ''}`}
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="edit-email">Email <span>*</span></label>
                  <input
                    id="edit-email"
                    className={`form-input${errors.email ? ' error' : ''}`}
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="edit-phone">Phone <span>*</span></label>
                  <input
                    id="edit-phone"
                    className={`form-input${errors.phone ? ' error' : ''}`}
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="edit-status">Status <span>*</span></label>
                  <select id="edit-status" className="form-select" value={form.status} onChange={set('status')}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="edit-source">Source</label>
                  <select id="edit-source" className="form-select" value={form.source} onChange={set('source')}>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group full">
                  <label className="form-label" htmlFor="edit-notes">Notes</label>
                  <textarea
                    id="edit-notes"
                    className="form-textarea"
                    value={form.notes}
                    onChange={set('notes')}
                  />
                </div>
              </div>

              <div className="form-actions">
                <Link to="/leads" className="btn btn-ghost">Cancel</Link>
                <button id="update-lead-btn" type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Updating…' : 'Update Lead'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
