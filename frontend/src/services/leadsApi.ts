import axios from 'axios';
import type { Lead, LeadFormData, LeadsResponse, BulkStatusPayload } from '../types/lead';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const leadsApi = {
  getLeads: async (params?: { search?: string; status?: string }): Promise<LeadsResponse> => {
    const res = await api.get<LeadsResponse>('/leads', { params });
    return res.data;
  },

  getLead: async (id: number): Promise<Lead> => {
    const res = await api.get<{ data: Lead }>(`/leads/${id}`);
    return res.data.data;
  },

  createLead: async (data: LeadFormData): Promise<Lead> => {
    const res = await api.post<{ data: Lead }>('/leads', data);
    return res.data.data;
  },

  updateLead: async (id: number, data: LeadFormData): Promise<Lead> => {
    const res = await api.put<{ data: Lead }>(`/leads/${id}`, data);
    return res.data.data;
  },

  // Bulk status update — endpoint exists, not yet wired to UI
  bulkStatusUpdate: async (payload: BulkStatusPayload): Promise<{ updated: number }> => {
    const res = await api.post<{ updated: number }>('/leads/bulk-status', payload);
    return res.data;
  },

  // Delete a lead — backend endpoint exists but is not yet fully implemented
  deleteLead: async (id: number): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },
};
