import axios, { AxiosHeaders } from "axios";

type CreateError = {
  message: string;
};

// axios instance for making requests
const axiosInstance = axios.create();

// request interceptor for adding token
axiosInstance.interceptors.request.use(
  (config) => {
    // add token to request headers
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      (config.headers as AxiosHeaders).set("x-access-token", user.accessToken);
      (config.headers as AxiosHeaders).set("Content-Type", "application/json");
    }
    return config;
  },
  (error: CreateError) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: CreateError) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
