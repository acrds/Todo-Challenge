import axios from "axios";
import {getToken} from "../utils/tokenStorage";
import { useAIStore } from "../store/aiStore";

const api = axios.create({
  //I created a domain to host the backend. But if you want to run it locally, you can change it to expo server port
  baseURL: "https://tobeeapp.tanooki.cloud/api/", 
  timeout: 9000, 
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
  }
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    const selectedAI = useAIStore.getState().selectedAI;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ModelType = selectedAI;
    }
    return config;
  });

export default api;

