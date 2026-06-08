export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source?: string;
  notes?: string;
}

export interface LeadsResponse {
  data: Lead[];
  total: number;
}

export interface BulkStatusPayload {
  ids: number[];
  status: LeadStatus;
}
