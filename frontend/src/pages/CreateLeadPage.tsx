import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { leadsApi } from '../services/leadsApi';
import Header from '../components/Header';
import type { LeadFormData, LeadStatus } from '../types/lead';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const SOURCES = ['Website', 'Referral', 'Instagram', 'Walk-in', 'Other'];

const empty: LeadFormData = {
  name: '', email: '', phone: '', status: 'New', source: 'Website', notes: '',
};

export default function CreateLeadPage() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState<LeadFormData>(empty);
  const [errors,  setErrors]  = useState<Partial<LeadFormData>>({});
  const [saving,  setSaving]  = useState(false);
  const [apiErr,  setApiErr]  = useState('');

  const validate = () => {
    const e: Partial<LeadFormData> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    setApiErr('');
    try {
      await leadsApi.createLead(form);
      navigate('/leads', { state: { success: 'Lead created successfully!' } });
    } catch (err: any) {
      setApiErr(err?.response?.data?.errors
        ? Object.values(err.response.data.errors).join(', ')
        : 'Failed to create lead. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const set = (field: keyof LeadFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
    };

  return (
    <>
      <Header
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Leads', to: '/leads' },
          { label: 'Add Lead' },
        ]}
      />

      <div className="page-body">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Add Lead</h1>
            <p className="page-subtitle">Create a new lead using the lead form.</p>
          </div>
        </div>

        <div className="card form-card">
          {apiErr && <div style={{ padding: '16px 20px 0' }}><div className="alert-banner error">{apiErr}</div></div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section-title">Lead Information</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="create-name">Full Name <span>*</span></label>
                <input
                  id="create-name"
                  className={`form-input${errors.name ? ' error' : ''}`}
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={set('name')}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-email">Email <span>*</span></label>
                <input
                  id="create-email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={set('email')}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-phone">Phone <span>*</span></label>
                <input
                  id="create-phone"
                  className={`form-input${errors.phone ? ' error' : ''}`}
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={set('phone')}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-status">Status <span>*</span></label>
                <select id="create-status" className="form-select" value={form.status} onChange={set('status')}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-source">Source</label>
                <select id="create-source" className="form-select" value={form.source} onChange={set('source')}>
                  {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group full">
                <label className="form-label" htmlFor="create-notes">Notes</label>
                <textarea
                  id="create-notes"
                  className="form-textarea"
                  placeholder="Enter notes (optional)"
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/leads" className="btn btn-ghost">Cancel</Link>
              <button id="save-lead-btn" type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
