// src/hooks/api/use-empresas.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { Empresa } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant"; // Assuming this hook exists and provides id_empresa

const QUERY_KEY_EMPRESAS = "empresas";

export const useEmpresas = () => {
  // Although mockApi.getEmpresas currently doesn't use tenant ID,
  // we include it in the query key and enable check for future proofing
  // and consistency with other tenant-specific hooks.
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id; // Assuming tenant object has an id field

  return useQuery<Empresa[], Error>({
    queryKey: [QUERY_KEY_EMPRESAS, id_empresa],
    queryFn: () => mockApi.getEmpresas(),
    enabled: !!id_empresa, // Only run if id_empresa is available
  });
};

export const useEmpresa = (empresaId: string) => {
  return useQuery<Empresa | undefined, Error>({
    queryKey: [QUERY_KEY_EMPRESAS, empresaId],
    queryFn: () => mockApi.getEmpresaById(empresaId),
    enabled: !!empresaId,
  });
};

export const useCreateEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Empresa,
    Error,
    Omit<Empresa, "id" | "fechaCreacion" | "activo">
  >({
    mutationFn: mockApi.createEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EMPRESAS] });
    },
  });
};

export const useUpdateEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Empresa | undefined,
    Error,
    Partial<Empresa> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateEmpresa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EMPRESAS] });
    },
  });
};

export const useDeleteEmpresa = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_EMPRESAS] });
    },
  });
};
