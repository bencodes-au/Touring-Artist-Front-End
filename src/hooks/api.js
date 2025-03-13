import axios from "axios";

const API_BASE_URL = "https://touring-artist-back-end.onrender.com";
const DEV_BASE_URL = "http://localhost:3000/";

const API_URL = import.meta.env.DEV ? DEV_BASE_URL : API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
