import axios from "axios";

const api = axios.create({
  baseURL: "localhost:4322",  
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
