import API from "./api";

// GET all plans (admin)
export const fetchPlans = () => API.get("/admin/plans");

// CREATE plan
export const createPlan = (data) => API.post("/admin/plans", data);

// UPDATE plan
export const updatePlan = (id, data) => API.put(`/admin/plans/${id}`, data);

// DELETE plan
export const deletePlan = (id) => API.delete(`/admin/plans/${id}`);
