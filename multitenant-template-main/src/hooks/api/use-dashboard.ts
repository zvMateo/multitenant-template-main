// src/hooks/api/use-dashboard.ts

import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/api/mock';
import { useTenant } from '@/components/providers/tenants/use-tenant';
import type { EventoCarga } from '@/types/common'; // Assuming EventoCarga is needed for recent events

// Types for Dashboard data
export interface DashboardKPIs {
  totalLitros: number;
  totalCosto: number;
  avgConsumo: number;
  stockTanques: {
    tanqueId: string;
    nombre: string;
    porcentaje: number;
    stockActual: number;
    capacidadLitros: number;
  }[];
  porcentajeValidados: number;
  alertasAbiertas: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface LitrosPorVehiculoData {
  vehiculoId: string;
  nombre: string;
  litros: number;
}


export const useDashboardKPIs = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<DashboardKPIs, Error>({
    queryKey: ['dashboardKPIs', id_empresa],
    queryFn: () => mockApi.getDashboardKPIs(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useEventosRecientes = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<EventoCarga[], Error>({
    queryKey: ['eventosRecientes', id_empresa],
    queryFn: () => mockApi.getEventosCarga(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useLitrosPorDia = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<ChartDataPoint[], Error>({
    queryKey: ['litrosPorDia', id_empresa],
    queryFn: () => mockApi.getLitrosPorDia(id_empresa!),
    enabled: !!id_empresa,
  });
};

export const useLitrosPorVehiculo = () => {
  const tenantConfig = useTenant();
  const id_empresa = tenantConfig?.id;

  return useQuery<LitrosPorVehiculoData[], Error>({
    queryKey: ['litrosPorVehiculo', id_empresa],
    queryFn: () => mockApi.getLitrosPorVehiculo(id_empresa!),
    enabled: !!id_empresa,
  });
};
