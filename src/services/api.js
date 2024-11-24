import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3006/api/", 
  timeout: 9000, 
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json"
  }
});

export default api;