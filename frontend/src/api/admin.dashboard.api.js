import api from "./api";

export const getDashboardAnalytics = () =>
  api.get("/admin/dashboard/analytics");
