import axios from "axios";
import { clearAuth } from "../utils/authManager";
import { API_BASE_URL } from "../utils/env";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401) await clearAuth();

    return Promise.reject(error);
  }
);

export default api;
