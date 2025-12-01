import SubdomainGuard from "@/components/guards/subdomain.guard";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "@/components/pages/_S/Home/HomePage";
import VehiculosPage from "@/components/pages/_S/Home/Vehiculos/VehiculosPage";
import DashboardPage from "@/components/pages/_S/Dashboard/DashboardPage";
import UsersPage from "@/components/pages/_S/Users/UsersPage";

import { type RouteObject } from "react-router";

export const tenantRoutes: RouteObject[] = [
  {
    path: "/s",
    element: (
      <SubdomainGuard type="subdomain">
        {/* SOLAMENTE pon el AppLayout. Él ya se encarga de renderizar el Outlet adentro */}
        <AppLayout />
      </SubdomainGuard>
    ),
    children: [
      {
        path: "", // Home principal
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "vehiculos",
        element: <VehiculosPage />,
      },
      {
        path: "usuarios",
        element: <UsersPage />,
      },
      {
        path: "reportes",
        element: <div>Reportes de Combustible</div>,
      },
    ],
  },
];
