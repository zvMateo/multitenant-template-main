// src/hooks/api/use-vehiculos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { Vehiculo } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant"; // Ajusta esta ruta si es necesario

const QUERY_KEY_VEHICULOS = "vehiculos";

export const useVehiculos = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id; // O usa un ID dummy si el contexto falla: "emp1"

  return useQuery<Vehiculo[], Error>({
    queryKey: [QUERY_KEY_VEHICULOS, id_empresa],
    queryFn: () => mockApi.getVehiculos(id_empresa || "emp1"),
    enabled: !!id_empresa, // Solo ejecuta si tenemos tenant
  });
};

export const useVehiculo = (vehiculoId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Vehiculo | undefined, Error>({
    queryKey: [QUERY_KEY_VEHICULOS, vehiculoId],
    queryFn: () => mockApi.getVehiculoById(vehiculoId),
    enabled: !!vehiculoId,
  });
};

// --- AQUÍ ESTÁ LA EXPORTACIÓN QUE FALTABA ---
export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id || "emp1";

  return useMutation<
    Vehiculo,
    Error,
    Omit<Vehiculo, "id" | "activo" | "id_empresa">
  >({
    mutationFn: (newVehiculoData) =>
      mockApi.createVehiculo({ ...newVehiculoData, id_empresa }),
    onSuccess: () => {
      // Invalidar cache para recargar la tabla automáticamente
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_VEHICULOS, id_empresa],
      });
    },
  });
};

export const useUpdateVehiculo = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Vehiculo | undefined,
    Error,
    Partial<Vehiculo> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateVehiculo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_VEHICULOS, id_empresa],
      });
    },
  });
};

export const useDeleteVehiculo = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteVehiculo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_VEHICULOS, id_empresa],
      });
    },
  });
};
