// src/hooks/api/use-vehiculos.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '@/api/mock';
import type { Vehiculo } from '@/types/common';
import { useTenant } from '@/components/providers/tenants/use-tenant';

const QUERY_KEY_VEHICULOS = 'vehiculos';

export const useVehiculos = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Vehiculo[], Error>({
    queryKey: [QUERY_KEY_VEHICULOS, id_empresa],
    queryFn: () => mockApi.getVehiculos(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useVehiculo = (vehiculoId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Vehiculo | undefined, Error>({
    queryKey: [QUERY_KEY_VEHICULOS, vehiculoId],
    queryFn: () => mockApi.getVehiculoById(vehiculoId),
    enabled: !!vehiculoId && !!id_empresa,
  });
};

export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<Vehiculo, Error, Omit<Vehiculo, 'id' | 'activo' | 'id_empresa'>>({
    mutationFn: (newVehiculoData) => mockApi.createVehiculo({ ...newVehiculoData, id_empresa: id_empresa! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_VEHICULOS, id_empresa] });
    },
  });
};

export const useUpdateVehiculo = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<Vehiculo | undefined, Error, Partial<Vehiculo> & { id: string }>({
    mutationFn: ({ id, ...data }) => mockApi.updateVehiculo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_VEHICULOS, id_empresa] });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_VEHICULOS, id_empresa] });
    },
  });
};
