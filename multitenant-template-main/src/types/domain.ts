// Interfaces base para todas las entidades
export interface BaseEntity {
  id: string;
  createdAt: string; // ISO Date
  updatedAt?: string;
  isActive: boolean;
}

// --- Entidades Principales (SRS Punto 5) ---

export interface Empresa extends BaseEntity {
  nombre: string;
  cuit: string;
  direccion?: string;
  // Configuración de políticas (SRS 3.2)
  configuracion: {
    limiteLitros?: number;
    requiereFotoOdometro: boolean;
    requiereFotoSurtidor: boolean;
    validarGeolocalizacion: boolean;
  };
}

export interface Usuario extends BaseEntity {
  nombre: string;
  email: string;
  telefono: string; // Clave para el agente de WhatsApp
  rol: "OPERADOR" | "SUPERVISOR" | "AUDITOR";
  whitelistWhatsApp: boolean; // (SRS 3.1)
}

export interface Vehiculo extends BaseEntity {
  patente: string;
  descripcion: string; // Marca/Modelo
  tipo: "VEHICULO" | "MAQUINARIA";
  centroCostoId?: string; // Relación con Centro de Costos
  odometroActual: number;
  horasUsoActual?: number; // Para maquinaria
}

export interface Tanque extends BaseEntity {
  nombre: string;
  capacidadTotal: number;
  stockActual: number;
  tipoCombustible: "DIESEL" | "NAFTA" | "OTROS";
  surtidores?: Surtidor[]; // Relación opcional para vistas anidadas
}

export interface Surtidor extends BaseEntity {
  nombre: string;
  tanqueId: string;
  ultimoContador: number; // Para validación de continuidad
}

// --- Eventos y Reportes (SRS 3.1 y 3.3) ---

export interface EventoCarga extends BaseEntity {
  usuarioId: string;
  vehiculoId: string;
  surtidorId: string;
  fechaHora: string;
  litros: number;
  odometroRegistrado: number;
  ubicacion: {
    lat: number;
    lng: number;
    direccion?: string;
  };
  evidencias: {
    fotoSurtidorUrl?: string;
    fotoOdometroUrl?: string;
    audioUrl?: string; // (SRS 3.1 Audio opcional)
  };
  estado: "PENDIENTE" | "VALIDADO" | "ANOMALIA";
}

// Dashboard KPIs (SRS 7)
export interface DashboardKPIs {
  litrosTotalesMes: number;
  costoTotalMes: number;
  stockTanques: Array<{ tanqueId: string; nombre: string; porcentaje: number }>;
  alertasAbiertas: number;
}
