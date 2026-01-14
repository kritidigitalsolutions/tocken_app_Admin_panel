import API from "./api";

// ADMIN APIs
export const fetchFAQs = () => API.get("/admin/faqs");
export const createFAQ = (data) => API.post("/admin/faqs", data);
export const updateFAQ = (id, data) => API.put(`/admin/faqs/${id}`, data);
export const deleteFAQ = (id) => API.delete(`/admin/faqs/${id}`);

