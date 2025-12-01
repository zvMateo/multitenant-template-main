import SubdomainGuard from "@/components/guards/subdomain.guard";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "@/components/pages/_S/Home/HomePage";
// Crear estos componentes vacíos temporalmente para que compile
// import Dashboard from "@/components/pages/_S/Dashboard";
// import VehiculosList from "@/components/pages/_S/Vehiculos/List";
// import UsuariosList from "@/components/pages/_S/Usuarios/List";

import { Outlet, type RouteObject } from "react-router";

export const tenantRoutes: RouteObject[] = [
  {
    path: "/s",
    element: (
      <SubdomainGuard type="subdomain">
        {/* Layout principal del Tenant: Sidebar + Contenido */}
        <AppLayout />
        <div className="flex h-screen overflow-hidden bg-background">
          {/* <Sidebar /> */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </SubdomainGuard>
    ),
    children: [
      {
        path: "", // Dashboard principal
        element: <HomePage />,
      },
      {
        path: "vehiculos",
        // element: <VehiculosList />,
        element: <div>ABM Vehículos</div>,
      },
      {
        path: "usuarios",
        // element: <UsuariosList />,
        element: <div>ABM Usuarios</div>,
      },
      {
        path: "reportes",
        element: <div>Reportes de Combustible</div>,
      },
    ],
  },
];
