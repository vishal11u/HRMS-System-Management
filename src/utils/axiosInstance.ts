import axios from "axios";

export const CalendlyUrl = "https://calendly.com/klickedusm/30min";

const axiosInstance = axios.create({
  baseURL: "https://api.findcourse.ai",
  // "https://api.findcourse.ai/",
  // "http://208.109.36.143:8080/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
