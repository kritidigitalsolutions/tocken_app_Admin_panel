import API from "./api";

export const fetchDashboardStats = () =>
  API.get("/admin/dashboard/analytics");
