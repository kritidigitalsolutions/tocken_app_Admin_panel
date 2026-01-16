import API from "./api";

// Get all bookmarks (admin)
export const getAllBookmarks = (params = {}) => {
  return API.get("/admin/bookmarks", { params });
};

// Get bookmark stats (admin)
export const getBookmarkStats = () => {
  return API.get("/admin/bookmarks/stats");
};
