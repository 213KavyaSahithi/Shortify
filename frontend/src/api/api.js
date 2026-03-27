import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API response error:", error.response || error);
    return Promise.reject(error);
  }
);

export default api;