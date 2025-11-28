import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// Interceptors para JWT, manejo de errores, etc. pueden agregarse aquí
