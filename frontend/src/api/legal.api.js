import API from "./api";

export const getLegal = (type) =>
  API.get(`/legal/${type}`);

export const updateLegal = (type, data) =>
  API.put(`/legal/${type}`, data);
