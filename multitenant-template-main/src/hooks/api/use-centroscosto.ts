// src/hooks/api/use-centroscosto.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { CentroCosto } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant";

const QUERY_KEY_CENTROS_COSTO = "centrosCosto";

export const useCentrosCosto = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<CentroCosto[], Error>({
    queryKey: [QUERY_KEY_CENTROS_COSTO, id_empresa],
    queryFn: () => mockApi.getCentrosCosto(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useCentroCosto = (centroCostoId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<CentroCosto | undefined, Error>({
    queryKey: [QUERY_KEY_CENTROS_COSTO, centroCostoId],
    queryFn: () => mockApi.getCentroCostoById(centroCostoId),
    enabled: !!centroCostoId && !!id_empresa,
  });
};

export const useCreateCentroCosto = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    CentroCosto,
    Error,
    Omit<CentroCosto, "id" | "activo" | "id_empresa">
  >({
    mutationFn: (newCentroCostoData) =>
      mockApi.createCentroCosto({
        ...newCentroCostoData,
        id_empresa: id_empresa!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CENTROS_COSTO, id_empresa],
      });
    },
  });
};

export const useUpdateCentroCosto = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    CentroCosto | undefined,
    Error,
    Partial<CentroCosto> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateCentroCosto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CENTROS_COSTO, id_empresa],
      });
    },
  });
};

export const useDeleteCentroCosto = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteCentroCosto,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CENTROS_COSTO, id_empresa],
      });
    },
  });
};
