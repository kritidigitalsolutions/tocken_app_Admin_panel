import API from "./api";

// GET all users (admin)
export const fetchUsers = () => API.get("/admin/users");

// UPDATE user (block/unblock)
export const updateUser = (id, data) =>
  API.put(`/admin/users/${id}`, data);
