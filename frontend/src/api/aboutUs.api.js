import api from "./api";

// Get About Us for admin (includes Draft)
export const fetchAboutUs = () => api.get("/admin/aboutus");

// Update About Us
export const updateAboutUs = (data) => api.put("/admin/aboutus", data);
