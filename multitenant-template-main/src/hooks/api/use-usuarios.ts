// src/hooks/api/use-usuarios.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mock";
import type { Usuario } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant";

const QUERY_KEY_USUARIOS = "usuarios";

export const useUsuarios = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Usuario[], Error>({
    queryKey: [QUERY_KEY_USUARIOS, id_empresa],
    queryFn: () => mockApi.getUsuarios(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useUsuario = (usuarioId: string) => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<Usuario | undefined, Error>({
    queryKey: [QUERY_KEY_USUARIOS, usuarioId],
    queryFn: () => mockApi.getUsuarioById(usuarioId),
    enabled: !!usuarioId && !!id_empresa,
  });
};

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Usuario,
    Error,
    Omit<Usuario, "id" | "fechaCreacion" | "habilitado" | "id_empresa">
  >({
    mutationFn: (newUsuarioData) =>
      mockApi.createUsuario({ ...newUsuarioData, id_empresa: id_empresa! }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_USUARIOS, id_empresa],
      });
    },
  });
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<
    Usuario | undefined,
    Error,
    Partial<Usuario> & { id: string }
  >({
    mutationFn: ({ id, ...data }) => mockApi.updateUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_USUARIOS, id_empresa],
      });
    },
  });
};

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useMutation<boolean, Error, string>({
    mutationFn: mockApi.deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_USUARIOS, id_empresa],
      });
    },
  });
};
