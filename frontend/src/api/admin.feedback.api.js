import API from "./api";

// Get all feedbacks (admin)
export const getAllFeedbacks = (params = {}) => {
  return API.get("/admin/feedbacks", { params });
};

// Get feedback stats (admin)
export const getFeedbackStats = () => {
  return API.get("/admin/feedbacks/stats");
};

// Update feedback status (admin)
export const updateFeedbackStatus = (id, data) => {
  return API.patch(`/admin/feedbacks/${id}/status`, data);
};

// Delete feedback (admin)
export const deleteFeedback = (id) => {
  return API.delete(`/admin/feedbacks/${id}`);
};
