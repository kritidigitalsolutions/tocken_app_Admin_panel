import api from "./api";

export const getAllLeads = () =>
  api.get("/admin/leads");

export const getLeadsByProperty = (propertyId) =>
  api.get(`/admin/leads/property/${propertyId}`);

export const updateLeadStatus = (id, status) =>
  api.patch(`/admin/leads/${id}/status`, { status });
