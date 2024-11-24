import axios from "axios";
import {getToken} from "../utils/tokenStorage";

const api = axios.create({
  baseURL: "http://127.0.0.1:3006/api/", 
  timeout: 9000, 
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json"
  }
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;