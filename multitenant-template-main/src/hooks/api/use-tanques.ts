// src/hooks/api/use-tanques.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { Tanque } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant";

const QUERY_KEY_TANQUES = "tanques";

export const useTanques = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Tanque[], Error>({
    queryKey: [QUERY_KEY_TANQUES, id_empresa],
    queryFn: () => mockApi.getTanques(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useTanque = (tanqueId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Tanque | undefined, Error>({
    queryKey: [QUERY_KEY_TANQUES, tanqueId],
    queryFn: () => mockApi.getTanqueById(tanqueId),
    enabled: !!tanqueId && !!id_empresa,
  });
};

export const useCreateTanque = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Tanque,
    Error,
    Omit<Tanque, "id" | "activo" | "id_empresa">
  >({
    mutationFn: (newTanqueData) =>
      mockApi.createTanque({ ...newTanqueData, id_empresa: id_empresa! }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TANQUES, id_empresa],
      });
    },
  });
};

export const useUpdateTanque = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Tanque | undefined,
    Error,
    Partial<Tanque> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateTanque(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TANQUES, id_empresa],
      });
    },
  });
};

export const useDeleteTanque = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteTanque,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TANQUES, id_empresa],
      });
    },
  });
};
