import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiClient } from '@/lib/api-client'; // <--- Comenta esto por ahora
import type { Vehiculo } from "@/types/domain";

// --- MOCK DATA (Datos falsos para probar la vista) ---
const MOCK_VEHICULOS: Vehiculo[] = [
  {
    id: "1",
    patente: "AA123BB",
    descripcion: "Toyota Hilux 4x4",
    tipo: "VEHICULO",
    odometroActual: 45000,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    patente: "MAQ-99",
    descripcion: "Tractor John Deere",
    tipo: "MAQUINARIA",
    odometroActual: 1200, // Horas
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// --- Funciones Modificadas ---

const fetchVehiculos = async (): Promise<Vehiculo[]> => {
  // Simulamos un retraso de red de 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_VEHICULOS;

  // CUANDO TENGAS LA API, DESCOMENTA ESTO Y BORRA LO DE ARRIBA:
  // const { data } = await apiClient.get('/vehiculos');
  // return data;
};

const createVehiculo = async (nuevoVehiculo: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Vehículo creado (Simulado):", nuevoVehiculo);
  return { ...nuevoVehiculo, id: Math.random().toString() };
};

// --- Hooks (Sin cambios) ---
export const useVehiculos = () => {
  return useQuery({
    queryKey: ["vehiculos"],
    queryFn: fetchVehiculos,
  });
};

export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehiculo,
    onSuccess: () => {
      // Invalida la cache para recargar la lista
      queryClient.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
};
