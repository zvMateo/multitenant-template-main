// src/api/vehiculos.ts
import { Vehiculo, ApiResponse } from "@/types/domain";
import { delay, mockResponse } from "@/lib/api-client";

// --- MOCK DATA (Simulando DB) ---
const MOCK_VEHICULOS: Vehiculo[] = [
  {
    id: "v-001",
    tenantId: "tenant-a",
    createdAt: new Date().toISOString(),
    patente: "AA123BB",
    marca: "Toyota",
    modelo: "Hilux",
    anio: 2023,
    tipo: "camioneta",
    estado: "activo",
    ultimoOdometro: 15000,
  },
  {
    id: "v-002",
    tenantId: "tenant-a",
    createdAt: new Date().toISOString(),
    patente: "AD456CC",
    marca: "Ford",
    modelo: "Cargo 1722",
    anio: 2020,
    tipo: "camion",
    estado: "mantenimiento",
    ultimoOdometro: 120500,
  },
  {
    id: "v-003",
    tenantId: "tenant-b", // Dato de otro tenant (para probar aislamiento)
    createdAt: new Date().toISOString(),
    patente: "ZZ999ZZ",
    marca: "Caterpillar",
    modelo: "Excavadora 320",
    anio: 2019,
    tipo: "maquinaria",
    estado: "activo",
    ultimoOdometro: 5400, // Horas en lugar de KM
  },
];

// --- SERVICE METHODS ---

export const vehiculosApi = {
  getAll: async (tenantId: string): Promise<ApiResponse<Vehiculo[]>> => {
    await delay(); // Simulamos red

    // Filtramos por tenant para simular el aislamiento del Backend
    const filteredData = MOCK_VEHICULOS.filter((v) => v.tenantId === tenantId);

    return mockResponse(filteredData);
  },

  getById: async (id: string): Promise<ApiResponse<Vehiculo | undefined>> => {
    await delay();
    const vehiculo = MOCK_VEHICULOS.find((v) => v.id === id);
    return mockResponse(vehiculo);
  },

  create: async (
    data: Omit<Vehiculo, "id" | "createdAt" | "tenantId">,
    tenantId: string
  ): Promise<ApiResponse<Vehiculo>> => {
    await delay(1500); // Crear tarda un poco más

    const newVehiculo: Vehiculo = {
      ...data,
      id: `v-${Math.random().toString(36).substr(2, 9)}`,
      tenantId,
      createdAt: new Date().toISOString(),
    };

    MOCK_VEHICULOS.push(newVehiculo); // Actualizamos "DB" en memoria
    return mockResponse(newVehiculo);
  },
};
