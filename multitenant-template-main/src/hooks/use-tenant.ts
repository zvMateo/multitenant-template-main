// src/hooks/use-tenant.ts
import { useState, useEffect } from "react";

export const useTenant = () => {
  const [tenantId, setTenantId] = useState<string>("");
  const [subdomain, setSubdomain] = useState<string>("");

  useEffect(() => {
    // Lógica básica para obtener subdominio: "empresa1.misistema.com" -> "empresa1"
    const host = window.location.hostname;
    const parts = host.split(".");

    let currentSubdomain = "localhost"; // Fallback
    let simulatedTenantId = "tenant-a"; // Default para desarrollo local

    if (parts.length > 2 || (parts.length === 2 && parts[1] === "localhost")) {
      currentSubdomain = parts[0];
      // En producción real, el backend valida esto.
      // Aquí simulamos un mapeo:
      if (currentSubdomain === "demo") simulatedTenantId = "tenant-a";
      if (currentSubdomain === "test") simulatedTenantId = "tenant-b";
    }

    setSubdomain(currentSubdomain);
    setTenantId(simulatedTenantId);

    console.log(
      `[Multi-tenant System] Detectado: ${currentSubdomain} -> ID: ${simulatedTenantId}`
    );
  }, []);

  return { tenantId, subdomain };
};
