import API from "./api";

// GET all users (admin)
export const fetchUsers = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.userType && params.userType !== "All") {
    queryParams.append("userType", params.userType);
  }
  const queryString = queryParams.toString();
  return API.get(`/admin/users${queryString ? `?${queryString}` : ""}`);
};

// UPDATE user (block/unblock)
export const updateUser = (id, data) =>
  API.put(`/admin/users/${id}`, data);

// BLOCK user
export const blockUser = (id) =>
  API.patch(`/admin/users/${id}/block`);

// DELETE user
export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

// TOGGLE phone privacy (admin)
export const togglePhonePrivacy = (id, isPhonePrivate) =>
  API.put(`/admin/users/${id}`, { isPhonePrivate });
