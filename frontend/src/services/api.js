// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",   // Nos conectamos a la URL del backend
});

export default api;
