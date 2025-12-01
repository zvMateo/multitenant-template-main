import {
  LayoutDashboard,
  Fuel,
  Users,
  Building,
  Truck,
  Database,
  Tag, // Added for Centros de Costo
} from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  role?: string[]; // Optional roles to show the link
}

export const navLinks: NavLink[] = [
  {
    href: '/s/dashboard',
    label: 'Dashboard General',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/s/eventos',
    label: 'Eventos de Carga',
    icon: <Fuel className="h-5 w-5" />,
  },
  // Admin Links
  {
    href: '/s/admin/dashboard',
    label: 'Dashboard Admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
    role: ['admin', 'superadmin'],
  },
  {
    href: '/s/admin/empresas',
    label: 'Empresas',
    icon: <Building className="h-5 w-5" />,
    role: ['superadmin'],
  },
  {
    href: '/s/admin/usuarios',
    label: 'Usuarios',
    icon: <Users className="h-5 w-5" />,
    role: ['admin', 'superadmin'],
  },
  {
    href: '/s/admin/vehiculos',
    label: 'Vehículos',
    icon: <Truck className="h-5 w-5" />,
    role: ['admin', 'superadmin'],
  },
  {
    href: '/s/admin/surtidores',
    label: 'Surtidores',
    icon: <Fuel className="h-5 w-5" />,
    role: ['admin', 'superadmin'],
  },
  {
    href: '/s/admin/tanques',
    label: 'Tanques',
    icon: <Database className="h-5 w-5" />,
    role: ['admin', 'superadmin'],
  },
  {
    href: '/s/admin/centroscosto',
    label: 'Centros de Costo',
    icon: <Tag className="h-5 w-5" />, // Changed to Tag icon
    role: ['admin', 'superadmin'],
  },
];