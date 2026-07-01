import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-grocery-tracker-eight.vercel.app/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
