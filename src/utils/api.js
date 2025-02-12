import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Ganti dengan API backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
