import axios from "axios";

// axios instance for making requests
const axiosInstance = axios.create();

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers["x-access-token"] = user.accessToken;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
