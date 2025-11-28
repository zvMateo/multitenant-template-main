import axios from "axios";

// Usamos una variable de entorno para la URL base.
// En desarrollo (VITE_ENV=development) apuntará a tu mock o localhost de .NET
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para inyectar el Tenant ID
apiClient.interceptors.request.use(
  (config) => {
    const hostname = window.location.hostname;
    // Lógica extraída de tu hook useTenantDomain.ts para consistencia
    const appDomain = import.meta.env.VITE_APP_DOMAIN || "localhost";
    let tenant = "default";

    const subdomain = hostname.replace(`.${appDomain}`, "");
    if (subdomain && subdomain !== hostname) {
      tenant = subdomain;
    }

    // Header estándar para multi-tenancy
    config.headers["X-Tenant-ID"] = tenant;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
