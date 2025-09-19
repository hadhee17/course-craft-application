import api from "./api";

export const getCurrentUser = () => api.get("/auth/me");
export const loginReq = (email, password) =>
  api.post("/auth/login", { email, password });
export const signupReq = (payload) => api.post("/auth/signup", payload);
export const logoutReq = () => api.post("/auth/logout");
