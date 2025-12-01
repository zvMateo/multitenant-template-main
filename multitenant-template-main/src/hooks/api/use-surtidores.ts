// src/hooks/api/use-surtidores.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { Surtidor } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant";

const QUERY_KEY_SURTIDORES = "surtidores";

export const useSurtidores = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Surtidor[], Error>({
    queryKey: [QUERY_KEY_SURTIDORES, id_empresa],
    queryFn: () => mockApi.getSurtidores(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useSurtidor = (surtidorId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Surtidor | undefined, Error>({
    queryKey: [QUERY_KEY_SURTIDORES, surtidorId],
    queryFn: () => mockApi.getSurtidorById(surtidorId),
    enabled: !!surtidorId && !!id_empresa,
  });
};

export const useCreateSurtidor = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Surtidor,
    Error,
    Omit<Surtidor, "id" | "activo" | "id_empresa">
  >({
    mutationFn: (newSurtidorData) =>
      mockApi.createSurtidor({ ...newSurtidorData, id_empresa: id_empresa! }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SURTIDORES, id_empresa],
      });
    },
  });
};

export const useUpdateSurtidor = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Surtidor | undefined,
    Error,
    Partial<Surtidor> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateSurtidor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SURTIDORES, id_empresa],
      });
    },
  });
};

export const useDeleteSurtidor = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteSurtidor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SURTIDORES, id_empresa],
      });
    },
  });
};
