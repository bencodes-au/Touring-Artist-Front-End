import axios from "axios";

const API_BASE_URL = "https://api.example.com";
const DEV_BASE_URL = "http://localhost:3000/";

const API_URL =
  process.env.NODE_ENV === "development" ? DEV_BASE_URL : API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
