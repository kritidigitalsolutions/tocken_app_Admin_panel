import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;
// const API_BASE = process.env.REACT_APP_API_URL || "https://backend-tocken-admin-panel.vercel.app/api";
// const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Get admin token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };
};

// Get auth header for multipart form data
const getMultipartAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };
};

export const wallpaperAPI = {
  // Public APIs
  getAllWallpapers: (params) =>
    axios.get(`${API_BASE}/wallpapers`, { params }),

  getWallpaperById: (id) =>
    axios.get(`${API_BASE}/wallpapers/${id}`),

  // Admin APIs
  getAllWallpapersAdmin: (params) =>
    axios.get(`${API_BASE}/admin/wallpapers`, { params, ...getAuthHeader() }),

  createWallpaper: (data) =>
    axios.post(`${API_BASE}/admin/wallpapers`, data, getMultipartAuthHeader()),

  updateWallpaper: (id, data) =>
    axios.put(`${API_BASE}/admin/wallpapers/${id}`, data, getMultipartAuthHeader()),

  deleteWallpaper: (id) =>
    axios.delete(`${API_BASE}/admin/wallpapers/${id}`, getAuthHeader())
};
