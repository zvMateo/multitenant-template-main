// src/types/common.ts

export interface Empresa {
  id: string;
  nombre: string;
  rut: string; // Used instead of CUIT for consistency with existing types
  direccion: string;
  telefono: string;
  email: string;
  configuracion: {
    evidenciasObligatorias: string[];
    umbrales: {
      litrosMaximos: number;
    };
    preciosCombustible: {
      [key: string]: number;
    };
  };
  fechaCreacion: string;
  activo: boolean;
}

export type UserRole = 'operador' | 'supervisor' | 'auditor' | 'admin' | 'superadmin';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_empresa: string;
  roles: UserRole[];
  fechaCreacion: string;
  habilitado: boolean; // Used instead of 'activo' for consistency with existing 'habilitado'
}

export interface Vehiculo {
  id: string;
  id_empresa: string;
  nombre: string; // From combustible.ts
  patente: string;
  marca: string;
  modelo: string;
  tipo: 'camion' | 'maquinaria' | 'automovil' | 'otro'; // Combined types
  centroCostoId?: string;
  consumoEsperado: {
    lt_km?: number; // Litros por 100km
    lt_hr?: number; // Litros por hora
  };
  kilometrajeInicial: number;
  activo: boolean;
}

export interface Surtidor {
  id: string;
  id_empresa: string;
  nombre: string;
  ubicacion: string;
  activo: boolean;
}

export interface Tanque {
  id: string;
  id_empresa: string;
  nombre: string;
  capacidadLitros: number; // Renamed from 'capacidad'
  combustibleTipo: string; // e.g., "Nafta Premium", "Gasoil"
  stockActual: number;
  activo: boolean;
}

export interface CentroCosto {
  id: string;
  id_empresa: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export type TipoEvidencia = 'foto_surtidor' | 'foto_odometro' | 'audio' | 'ubicacion' | 'texto';

export interface Evidencia {
  id: string;
  id_evento: string; // Consistent with existing
  tipo: TipoEvidencia;
  url: string;
  descripcion?: string; // From admin.ts
  fecha: string; // Consistent with existing ('fechaHora' renamed to 'fecha')
}

export interface EventoCarga {
  id: string;
  id_empresa: string;
  id_usuario: string; // Consistent with existing
  id_vehiculo: string;
  id_surtidor?: string;
  id_tanque?: string;
  fecha: string; // Consistent with existing ('fechaHora' renamed to 'fecha')
  litros: number;
  costo_total?: number; // From combustible.ts, made optional as it might be calculated
  odometro_horometro: number; // From combustible.ts
  geolocalizacion: {
    lat: number;
    lon: number; // Changed from 'lng' to 'lon' for consistency with existing
  };
  observaciones?: string;
  evidencias: Evidencia[]; // From combustible.ts
  validado: boolean; // From combustible.ts ('estado' changed to 'validado')
}

export interface Alerta {
  id: string;
  id_empresa: string;
  tipo: 'exceso_litros' | 'ubicacion_invalida' | 'tanque_bajo' | 'duplicado' | 'desvio_consumo' | 'error_ingreso'; // Combined types
  mensaje: string; // From combustible.ts ('descripcion' renamed to 'mensaje')
  id_evento?: string; // Consistent with existing ('eventoCargaId' renamed to 'id_evento')
  entidadAfectadaId?: string; // From admin.ts
  fecha: string; // Consistent with existing ('fechaHora' renamed to 'fecha')
  resuelta: boolean;
}

export interface AuditLog {
  id: string;
  id_empresa: string;
  id_usuario: string;
  accion: string;
  entidad: string; // From combustible.ts ('entidadAfectada' renamed to 'entidad')
  id_entidad: string; // From combustible.ts ('entidadAfectadaId' renamed to 'id_entidad')
  fecha: string; // Consistent with existing ('fechaHora' renamed to 'fecha')
  detalles: Record<string, any>; // From combustible.ts ('detalle' renamed to 'detalles')
}
