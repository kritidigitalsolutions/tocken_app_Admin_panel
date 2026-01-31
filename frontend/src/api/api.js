import axios from "axios";

const LOCAL_URL = "http://localhost:5000/api";
const HOSTED_URL = "https://backend-tocken-admin-panel.vercel.app/api";

// Check if localhost backend is available
const checkLocalBackend = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    await fetch(`${LOCAL_URL.replace('/api', '')}/`, { 
      method: 'HEAD',
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    return true;
  } catch {
    return false;
  }
};

// Initialize API with dynamic base URL
const API = axios.create({
  baseURL: LOCAL_URL, // Default to local
});

// Auto-detect backend on startup
(async () => {
  const isLocalAvailable = await checkLocalBackend();
  const selectedURL = isLocalAvailable ? LOCAL_URL : HOSTED_URL;
  API.defaults.baseURL = selectedURL;
  console.log(`🔗 API connected to: ${selectedURL}`);
})();

// 🔐 Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚨 Handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
