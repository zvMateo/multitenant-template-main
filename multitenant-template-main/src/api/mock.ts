// src/api/mock.ts

// Local type definitions to avoid module import errors
type Empresa = {
  id: string;
  nombre: string;
  rut: string;
  direccion: string;
  telefono: string;
  email: string;
  configuracion: any;
  fechaCreacion: string;
  activo: boolean;
};

type CentroCosto = {
  id: string;
  id_empresa: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};

type EventoCarga = {
  id: string;
  id_empresa: string;
  id_usuario: string;
  id_vehiculo: string;
  id_surtidor?: string;
  id_tanque?: string;
  fecha: string;
  litros: number;
  costo_total?: number;
  odometro_horometro: number;
  geolocalizacion: { lat: number; lon: number };
  observaciones?: string;
  evidencias: Evidencia[];
  validado: boolean;
};

type Evidencia = {
  id: string;
  id_evento: string;
  tipo: string;
  url: string;
  descripcion?: string;
  fecha: string;
};

type Alerta = {
  id: string;
  id_empresa: string;
  tipo: string;
  mensaje: string;
  id_evento?: string;
  entidadAfectadaId?: string;
  fecha: string;
  resuelta: boolean;
};

type AuditLog = {
  id: string;
  id_empresa: string;
  id_usuario: string;
  accion: string;
  entidad: string;
  id_entidad: string;
  fecha: string;
  detalles: Record<string, unknown>;
};

type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_empresa: string;
  roles: string[];
  fechaCreacion: string;
  habilitado: boolean;
};

type Vehiculo = {
  id: string;
  id_empresa: string;
  nombre: string;
  patente: string;
  marca: string;
  modelo: string;
  tipo: string;
  centroCostoId?: string;
  consumoEsperado: any;
  kilometrajeInicial: number;
  activo: boolean;
};

type Tanque = {
  id: string;
  id_empresa: string;
  nombre: string;
  capacidadLitros: number;
  combustibleTipo: string;
  stockActual: number;
  activo: boolean;
};

// Remove all imports from '@/types/common'

// Helper to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- MOCK DATABASE ---

let MOCK_EMPRESAS: Empresa[] = [
  {
    id: "emp1",
    nombre: "Constructora XYZ",
    rut: "76.123.456-7",
    direccion: "Av. Siempre Viva 742",
    telefono: "912345678",
    email: "contacto@constructora.xyz",
    configuracion: {
      evidenciasObligatorias: ["foto_surtidor", "foto_odometro"],
      umbrales: { litrosMaximos: 500 },
      preciosCombustible: { diesel: 1.2, gasolina: 1.5 },
    },
    fechaCreacion: new Date().toISOString(),
    activo: true,
  },
  {
    id: "emp2",
    nombre: "Transportes ACME",
    rut: "78.901.234-5",
    direccion: "Calle Falsa 123",
    telefono: "987654321",
    email: "info@transportesacme.cl",
    configuracion: {
      evidenciasObligatorias: ["foto_surtidor"],
      umbrales: { litrosMaximos: 300 },
      preciosCombustible: { diesel: 1.1 },
    },
    fechaCreacion: new Date().toISOString(),
    activo: true,
  },
];

let MOCK_USUARIOS: Usuario[] = [
  {
    id: "user1",
    nombre: "Juan",
    apellido: "Perez",
    email: "juan.perez@constructora.xyz",
    telefono: "+56911112222",
    id_empresa: "emp1",
    roles: ["operador"],
    fechaCreacion: new Date().toISOString(),
    habilitado: true,
  },
  {
    id: "user2",
    nombre: "Maria",
    apellido: "Lopez",
    email: "maria.lopez@constructora.xyz",
    telefono: "+56933334444",
    id_empresa: "emp1",
    roles: ["supervisor"],
    fechaCreacion: new Date().toISOString(),
    habilitado: true,
  },
  {
    id: "user3",
    nombre: "Carlos",
    apellido: "Silva",
    email: "carlos.silva@transportesacme.cl",
    telefono: "+56955556666",
    id_empresa: "emp2",
    roles: ["admin"],
    fechaCreacion: new Date().toISOString(),
    habilitado: true,
  },
];

let MOCK_VEHICULOS: Vehiculo[] = [
  {
    id: "veh1",
    id_empresa: "emp1",
    nombre: "Camión Tolva 01",
    patente: "ABCD12",
    marca: "Volvo",
    modelo: "FH16",
    tipo: "camion",
    centroCostoId: "cc1",
    consumoEsperado: { lt_km: 25 },
    kilometrajeInicial: 120000,
    activo: true,
  },
  {
    id: "veh2",
    id_empresa: "emp1",
    nombre: "Excavadora 320D",
    patente: "EXCA01",
    marca: "Caterpillar",
    modelo: "320D",
    tipo: "maquinaria",
    centroCostoId: "cc2",
    consumoEsperado: { lt_hr: 15 },
    kilometrajeInicial: 4000,
    activo: true,
  },
  {
    id: "veh3",
    id_empresa: "emp2",
    nombre: "Furgón Reparto",
    patente: "FGHI34",
    marca: "Mercedes-Benz",
    modelo: "Sprinter",
    tipo: "camioneta",
    consumoEsperado: { lt_km: 10 },
    kilometrajeInicial: 80000,
    activo: true,
  },
];

type Surtidor = {
  id: string;
  id_empresa: string;
  nombre: string;
  ubicacion: string;
  activo: boolean;
};

let MOCK_SURTIDORES: Surtidor[] = [
  {
    id: "sur1",
    id_empresa: "emp1",
    nombre: "Surtidor Principal",
    ubicacion: "Bodega Central",
    activo: true,
  },
  {
    id: "sur2",
    id_empresa: "emp2",
    nombre: "Surtidor Patio",
    ubicacion: "Patio de Maniobras",
    activo: true,
  },
];

let MOCK_TANQUES: Tanque[] = [
  {
    id: "tan1",
    id_empresa: "emp1",
    nombre: "Tanque Diesel A",
    capacidadLitros: 20000,
    combustibleTipo: "Diesel",
    stockActual: 15000,
    activo: true,
  },
  {
    id: "tan2",
    id_empresa: "emp2",
    nombre: "Tanque Gasolina 93",
    capacidadLitros: 10000,
    combustibleTipo: "Gasolina 93",
    stockActual: 8000,
    activo: true,
  },
];

let MOCK_CENTROS_COSTO: CentroCosto[] = [
  {
    id: "cc1",
    id_empresa: "emp1",
    nombre: "Proyecto Puente Nuevo",
    descripcion: "Costos asociados a la construcción del nuevo puente.",
    activo: true,
  },
  {
    id: "cc2",
    id_empresa: "emp1",
    nombre: "Mantenimiento General",
    descripcion: "Costos de mantenimiento de equipos y vehículos.",
    activo: true,
  },
  {
    id: "cc3",
    id_empresa: "emp2",
    nombre: "Ruta Sur",
    descripcion: "Costos de operación de la ruta de transporte al sur.",
    activo: true,
  },
];

let MOCK_EVENTOS: EventoCarga[] = [
  {
    id: "evt001",
    id_empresa: "emp1",
    id_usuario: "user1",
    id_vehiculo: "veh1",
    id_surtidor: "sur1",
    fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    litros: 150,
    costo_total: 180,
    odometro_horometro: 125000,
    geolocalizacion: { lat: -33.456, lon: -70.654 },
    observaciones: "Carga regular para Camión Tolva 01",
    evidencias: [],
    validado: true,
  },
  {
    id: "evt002",
    id_empresa: "emp1",
    id_usuario: "user1",
    id_vehiculo: "veh2",
    id_tanque: "tan1",
    fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    litros: 80,
    costo_total: 96,
    odometro_horometro: 4500,
    geolocalizacion: { lat: -33.457, lon: -70.655 },
    observaciones: "Carga para Excavadora 320D, se olvidó foto de horómetro.",
    evidencias: [],
    validado: false,
  },
  {
    id: "evt003",
    id_empresa: "emp2",
    id_usuario: "user3",
    id_vehiculo: "veh3",
    id_surtidor: "sur2",
    fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    litros: 60,
    costo_total: 66,
    odometro_horometro: 80123,
    geolocalizacion: { lat: -33.46, lon: -70.658 },
    observaciones: "Carga de furgón de reparto",
    evidencias: [],
    validado: true,
  },
];

let MOCK_EVIDENCIAS: Evidencia[] = [
  {
    id: "ev1",
    id_evento: "evt001",
    tipo: "foto_surtidor",
    url: "https://via.placeholder.com/150/0000FF/FFFFFF?text=SURTIDOR",
    descripcion: "Foto del surtidor",
    fecha: new Date().toISOString(),
  },
  {
    id: "ev2",
    id_evento: "evt001",
    tipo: "foto_odometro",
    url: "https://via.placeholder.com/150/FF0000/FFFFFF?text=ODOMETRO",
    descripcion: "Foto del odómetro",
    fecha: new Date().toISOString(),
  },
  {
    id: "ev3",
    id_evento: "evt002",
    tipo: "foto_surtidor",
    url: "https://via.placeholder.com/150/00FF00/FFFFFF?text=SURTIDOR_EXC",
    descripcion: "Foto del surtidor de la excavadora",
    fecha: new Date().toISOString(),
  },
];

let MOCK_ALERTAS: Alerta[] = [
  {
    id: "ale1",
    id_empresa: "emp1",
    tipo: "ubicacion_invalida",
    mensaje: "Carga fuera de la zona permitida",
    id_evento: "evt002",
    fecha: new Date().toISOString(),
    resuelta: false,
  },
  {
    id: "ale2",
    id_empresa: "emp1",
    tipo: "desvio_consumo",
    mensaje: "Consumo inusualmente alto para veh1",
    id_evento: "evt001",
    fecha: new Date().toISOString(),
    resuelta: false,
  },
];

let MOCK_AUDITLOGS: AuditLog[] = [
  {
    id: "aud1",
    id_empresa: "emp1",
    id_usuario: "user2",
    accion: "CREATE_VEHICULO",
    entidad: "Vehiculo",
    id_entidad: "veh1",
    fecha: new Date().toISOString(),
    detalles: { patente: "ABCD12", nombre: "Camión Tolva 01" },
  },
];

// Helper function to generate mock chart data
const generateDailyData = (
  startDate: Date,
  days: number,
  min: number,
  max: number
) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }
  return data.reverse();
};

// --- MOCK API SERVICE ---

export const mockApi = {
  // --- Empresas ---
  getEmpresas: async (): Promise<Empresa[]> => {
    await sleep(500);
    return MOCK_EMPRESAS.filter((e) => e.activo);
  },
  getEmpresaById: async (id: string): Promise<Empresa | undefined> => {
    await sleep(500);
    return MOCK_EMPRESAS.find((e) => e.id === id && e.activo);
  },
  createEmpresa: async (
    data: Omit<Empresa, "id" | "fechaCreacion" | "activo">
  ): Promise<Empresa> => {
    await sleep(500);
    const newEmpresa: Empresa = {
      id: `emp${MOCK_EMPRESAS.length + 1}`,
      ...data,
      fechaCreacion: new Date().toISOString(),
      activo: true,
    };
    MOCK_EMPRESAS.push(newEmpresa);
    return newEmpresa;
  },
  updateEmpresa: async (
    id: string,
    data: Partial<Empresa>
  ): Promise<Empresa | undefined> => {
    await sleep(500);
    const index = MOCK_EMPRESAS.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    MOCK_EMPRESAS[index] = { ...MOCK_EMPRESAS[index], ...data };
    return MOCK_EMPRESAS[index];
  },
  deleteEmpresa: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_EMPRESAS.findIndex((e) => e.id === id);
    if (index === -1) return false;
    MOCK_EMPRESAS[index].activo = false; // Soft delete
    return true;
  },

  // --- Usuarios ---
  getUsuarios: async (id_empresa: string): Promise<Usuario[]> => {
    await sleep(500);
    return MOCK_USUARIOS.filter(
      (u) => u.id_empresa === id_empresa && u.habilitado
    );
  },
  getUsuarioById: async (id: string): Promise<Usuario | undefined> => {
    await sleep(500);
    return MOCK_USUARIOS.find((u) => u.id === id && u.habilitado);
  },
  createUsuario: async (
    data: Omit<Usuario, "id" | "fechaCreacion" | "habilitado">
  ): Promise<Usuario> => {
    await sleep(500);
    const newUser: Usuario = {
      id: `user${MOCK_USUARIOS.length + 1}`,
      ...data,
      fechaCreacion: new Date().toISOString(),
      habilitado: true,
    };
    MOCK_USUARIOS.push(newUser);
    return newUser;
  },
  updateUsuario: async (
    id: string,
    data: Partial<Usuario>
  ): Promise<Usuario | undefined> => {
    await sleep(500);
    const index = MOCK_USUARIOS.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    MOCK_USUARIOS[index] = { ...MOCK_USUARIOS[index], ...data };
    return MOCK_USUARIOS[index];
  },
  deleteUsuario: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_USUARIOS.findIndex((u) => u.id === id);
    if (index === -1) return false;
    MOCK_USUARIOS[index].habilitado = false; // Soft delete
    return true;
  },

  // --- Vehiculos ---
  getVehiculos: async (id_empresa: string): Promise<Vehiculo[]> => {
    await sleep(500);
    return MOCK_VEHICULOS.filter(
      (v) => v.id_empresa === id_empresa && v.activo
    );
  },
  getVehiculoById: async (id: string): Promise<Vehiculo | undefined> => {
    await sleep(500);
    return MOCK_VEHICULOS.find((v) => v.id === id && v.activo);
  },
  createVehiculo: async (
    data: Omit<Vehiculo, "id" | "activo">
  ): Promise<Vehiculo> => {
    await sleep(500);
    const newVehiculo: Vehiculo = {
      id: `veh${MOCK_VEHICULOS.length + 1}`,
      ...data,
      activo: true,
    };
    MOCK_VEHICULOS.push(newVehiculo);
    return newVehiculo;
  },
  updateVehiculo: async (
    id: string,
    data: Partial<Vehiculo>
  ): Promise<Vehiculo | undefined> => {
    await sleep(500);
    const index = MOCK_VEHICULOS.findIndex((v) => v.id === id);
    if (index === -1) return undefined;
    MOCK_VEHICULOS[index] = { ...MOCK_VEHICULOS[index], ...data };
    return MOCK_VEHICULOS[index];
  },
  deleteVehiculo: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_VEHICULOS.findIndex((v) => v.id === id);
    if (index === -1) return false;
    MOCK_VEHICULOS[index].activo = false; // Soft delete
    return true;
  },

  // --- Surtidores ---
  getSurtidores: async (id_empresa: string): Promise<Surtidor[]> => {
    await sleep(500);
    return MOCK_SURTIDORES.filter(
      (s) => s.id_empresa === id_empresa && s.activo
    );
  },
  getSurtidorById: async (id: string): Promise<Surtidor | undefined> => {
    await sleep(500);
    return MOCK_SURTIDORES.find((s) => s.id === id && s.activo);
  },
  createSurtidor: async (
    data: Omit<Surtidor, "id" | "activo">
  ): Promise<Surtidor> => {
    await sleep(500);
    const newSurtidor: Surtidor = {
      id: `sur${MOCK_SURTIDORES.length + 1}`,
      ...data,
      activo: true,
    };
    MOCK_SURTIDORES.push(newSurtidor);
    return newSurtidor;
  },
  updateSurtidor: async (
    id: string,
    data: Partial<Surtidor>
  ): Promise<Surtidor | undefined> => {
    await sleep(500);
    const index = MOCK_SURTIDORES.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    MOCK_SURTIDORES[index] = { ...MOCK_SURTIDORES[index], ...data };
    return MOCK_SURTIDORES[index];
  },
  deleteSurtidor: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_SURTIDORES.findIndex((s) => s.id === id);
    if (index === -1) return false;
    MOCK_SURTIDORES[index].activo = false; // Soft delete
    return true;
  },

  // --- Tanques ---
  getTanques: async (id_empresa: string): Promise<Tanque[]> => {
    await sleep(500);
    return MOCK_TANQUES.filter((t) => t.id_empresa === id_empresa && t.activo);
  },
  getTanqueById: async (id: string): Promise<Tanque | undefined> => {
    await sleep(500);
    return MOCK_TANQUES.find((t) => t.id === id && t.activo);
  },
  createTanque: async (
    data: Omit<Tanque, "id" | "activo">
  ): Promise<Tanque> => {
    await sleep(500);
    const newTanque: Tanque = {
      id: `tan${MOCK_TANQUES.length + 1}`,
      ...data,
      activo: true,
    };
    MOCK_TANQUES.push(newTanque);
    return newTanque;
  },
  updateTanque: async (
    id: string,
    data: Partial<Tanque>
  ): Promise<Tanque | undefined> => {
    await sleep(500);
    const index = MOCK_TANQUES.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    MOCK_TANQUES[index] = { ...MOCK_TANQUES[index], ...data };
    return MOCK_TANQUES[index];
  },
  deleteTanque: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_TANQUES.findIndex((t) => t.id === id);
    if (index === -1) return false;
    MOCK_TANQUES[index].activo = false; // Soft delete
    return true;
  },

  // --- Centros de Costo ---
  getCentrosCosto: async (id_empresa: string): Promise<CentroCosto[]> => {
    await sleep(500);
    return MOCK_CENTROS_COSTO.filter(
      (cc) => cc.id_empresa === id_empresa && cc.activo
    );
  },
  getCentroCostoById: async (id: string): Promise<CentroCosto | undefined> => {
    await sleep(500);
    return MOCK_CENTROS_COSTO.find((cc) => cc.id === id && cc.activo);
  },
  createCentroCosto: async (
    data: Omit<CentroCosto, "id" | "activo">
  ): Promise<CentroCosto> => {
    await sleep(500);
    const newCentroCosto: CentroCosto = {
      id: `cc${MOCK_CENTROS_COSTO.length + 1}`,
      ...data,
      activo: true,
    };
    MOCK_CENTROS_COSTO.push(newCentroCosto);
    return newCentroCosto;
  },
  updateCentroCosto: async (
    id: string,
    data: Partial<CentroCosto>
  ): Promise<CentroCosto | undefined> => {
    await sleep(500);
    const index = MOCK_CENTROS_COSTO.findIndex((cc) => cc.id === id);
    if (index === -1) return undefined;
    MOCK_CENTROS_COSTO[index] = { ...MOCK_CENTROS_COSTO[index], ...data };
    return MOCK_CENTROS_COSTO[index];
  },
  deleteCentroCosto: async (id: string): Promise<boolean> => {
    await sleep(500);
    const index = MOCK_CENTROS_COSTO.findIndex((cc) => cc.id === id);
    if (index === -1) return false;
    MOCK_CENTROS_COSTO[index].activo = false; // Soft delete
    return true;
  },

  // --- Eventos de Carga ---
  getEventosCarga: async (id_empresa: string): Promise<EventoCarga[]> => {
    await sleep(800);
    return MOCK_EVENTOS.filter((e) => e.id_empresa === id_empresa);
  },
  getEventoCargaById: async (id: string): Promise<EventoCarga | undefined> => {
    await sleep(500);
    return MOCK_EVENTOS.find((e) => e.id === id);
  },
  createEventoCarga: async (
    data: Omit<EventoCarga, "id" | "evidencias">
  ): Promise<EventoCarga> => {
    await sleep(500);
    const newEvento: EventoCarga = {
      id: `evt${MOCK_EVENTOS.length + 1}`,
      ...data,
      evidencias: [], // Evidencias handled separately or added later
    };
    MOCK_EVENTOS.push(newEvento);
    return newEvento;
  },

  // --- Evidencias ---
  getEvidenciasByEvento: async (id_evento: string): Promise<Evidencia[]> => {
    await sleep(500);
    return MOCK_EVIDENCIAS.filter((ev) => ev.id_evento === id_evento);
  },
  // Add more CRUD for Evidencias if necessary, but for now it's linked to EventoCarga

  // --- Alertas ---
  getAlertas: async (
    id_empresa: string,
    resuelta?: boolean
  ): Promise<Alerta[]> => {
    await sleep(500);
    let alertas = MOCK_ALERTAS.filter((a) => a.id_empresa === id_empresa);
    if (resuelta !== undefined) {
      alertas = alertas.filter((a) => a.resuelta === resuelta);
    }
    return alertas;
  },

  // --- AuditLogs ---
  getAuditLogs: async (id_empresa: string): Promise<AuditLog[]> => {
    await sleep(500);
    return MOCK_AUDITLOGS.filter((al) => al.id_empresa === id_empresa);
  },

  // --- Dashboard ---
  getDashboardKPIs: async (id_empresa: string) => {
    await sleep(500);
    const eventosEmpresa = MOCK_EVENTOS.filter(
      (e) => e.id_empresa === id_empresa
    );
    const tanquesEmpresa = MOCK_TANQUES.filter(
      (t) => t.id_empresa === id_empresa
    );
    const alertasEmpresa = MOCK_ALERTAS.filter(
      (a) => a.id_empresa === id_empresa
    );

    const totalLitros = eventosEmpresa.reduce((sum, e) => sum + e.litros, 0);
    const totalCosto = eventosEmpresa.reduce(
      (sum, e) => sum + (e.costo_total || 0),
      0
    );
    const avgConsumo =
      eventosEmpresa.length > 0 ? totalLitros / eventosEmpresa.length : 0;

    const stockTanques = tanquesEmpresa.map((t) => ({
      tanqueId: t.id,
      nombre: t.nombre,
      porcentaje: (t.stockActual / t.capacidadLitros) * 100,
      stockActual: t.stockActual,
      capacidadLitros: t.capacidadLitros,
    }));

    const eventosValidados = eventosEmpresa.filter((e) => e.validado).length;
    const porcentajeValidados =
      eventosEmpresa.length > 0
        ? (eventosValidados / eventosEmpresa.length) * 100
        : 0;
    const alertasAbiertas = alertasEmpresa.filter((a) => !a.resuelta).length;

    return {
      totalLitros,
      totalCosto,
      avgConsumo,
      stockTanques,
      porcentajeValidados,
      alertasAbiertas,
    };
  },

  getLitrosPorDia: async (id_empresa: string) => {
    await sleep(500);
    // This is simplified and generates random data, not actual data from MOCK_EVENTOS
    const today = new Date();
    return generateDailyData(today, 30, 100, 500);
  },

  getLitrosPorVehiculo: async (id_empresa: string) => {
    await sleep(500);
    // This is simplified and generates random data, not actual data from MOCK_EVENTOS
    const vehiculos = MOCK_VEHICULOS.filter((v) => v.id_empresa === id_empresa);
    return vehiculos.map((v) => ({
      vehiculoId: v.id,
      nombre: v.nombre,
      litros: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    }));
  },
};
