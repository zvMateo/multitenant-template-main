// src/types/domain.ts

// Tipos base para respuestas de API estándar
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface BaseEntity {
  id: string;
  tenantId: string;
  createdAt: string;
  updatedAt?: string;
}

// Entidades de Negocio según SRS

export interface Empresa extends BaseEntity {
  razonSocial: string;
  cuit: string;
  direccion?: string;
  activo: boolean;
}

export interface Vehiculo extends BaseEntity {
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: "camioneta" | "camion" | "maquinaria" | "auto";
  estado: "activo" | "inactivo" | "mantenimiento";
  ultimoOdometro?: number;
  centroCostoId?: string; // Relación con Centro de Costo
}

export interface Surtidor extends BaseEntity {
  codigo: string; // Identificador físico
  nombre: string;
  tipoCombustible: "diesel" | "nafta" | "gnc";
  tanqueId: string; // Relación con Tanque
  ultimoContador: number; // Para validación de consistencia
}

export interface Tanque extends BaseEntity {
  nombre: string;
  capacidadTotal: number;
  stockActual: number;
  tipoCombustible: "diesel" | "nafta" | "gnc";
  alertaMinimo: number;
}
