import api from "./api";

export const fetchBanners = () => api.get("/admin/banners");

export const createBanner = (data) =>
  api.post("/admin/banners", data);

export const updateBanner = (id, data) =>
  api.put(`/admin/banners/${id}`, data);

export const toggleBannerStatus = (id) =>
  api.patch(`/admin/banners/${id}/toggle`);

export const deleteBanner = (id) =>
  api.delete(`/admin/banners/${id}`);
