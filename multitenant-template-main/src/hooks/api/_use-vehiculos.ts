import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Vehiculo } from "@/types/domain";

// --- API Functions (Aquí conectarás con C#) ---
const fetchVehiculos = async (): Promise<Vehiculo[]> => {
  const { data } = await apiClient.get("/vehiculos");
  return data;
};

const createVehiculo = async (
  payload: Omit<Vehiculo, "id" | "createdAt" | "isActive">
) => {
  const { data } = await apiClient.post("/vehiculos", payload);
  return data;
};

// --- Hooks ---
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
      queryClient.invalidateQueries({ queryKey: ["vehiculos"] });
    },
  });
};
