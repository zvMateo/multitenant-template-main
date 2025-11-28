import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { DashboardKPIs, EventoCarga } from "@/types/domain";

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: async (): Promise<DashboardKPIs> => {
      const { data } = await apiClient.get("/reportes/dashboard");
      return data;
    },
  });
};

export const useEventosRecientes = () => {
  return useQuery({
    queryKey: ["eventos-recientes"],
    queryFn: async (): Promise<EventoCarga[]> => {
      // Endpoint sugerido en SRS punto 6: GET /api/eventos
      const { data } = await apiClient.get("/eventos?limit=10");
      return data;
    },
  });
};
