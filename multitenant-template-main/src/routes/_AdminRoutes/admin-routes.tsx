import type { RouteObject } from "react-router";
import { AdminDashboard } from '@/components/pages/admin/AdminDashboard';
import EmpresasPage from '@/components/pages/admin/empresas/EmpresasPage';
import UsuariosPage from '@/components/pages/admin/usuarios/UsuariosPage';
import VehiculosPage from '@/components/pages/admin/vehiculos/VehiculosPage';
import SurtidoresPage from '@/components/pages/admin/surtidores/SurtidoresPage';
import TanquesPage from '@/components/pages/admin/tanques/TanquesPage';
import CentrosCostoPage from '@/components/pages/admin/centroscosto/CentrosCostoPage';


export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/empresas',
    element: <EmpresasPage />,
  },
  {
    path: '/admin/usuarios',
    element: <UsuariosPage />,
  },
  {
    path: '/admin/vehiculos',
    element: <VehiculosPage />,
  },
  {
    path: '/admin/surtidores',
    element: <SurtidoresPage />,
  },
  {
    path: '/admin/tanques',
    element: <TanquesPage />,
  },
  {
    path: '/admin/centroscosto',
    element: <CentrosCostoPage />,
  },
];