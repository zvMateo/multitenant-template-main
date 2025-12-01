import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { mockApi } from '@/api/mock';
import { useTenant } from '@/components/providers/tenants/use-tenant';
import type { EventoCarga } from '@/types/common';
import { DollarSign, Droplets, Truck } from 'lucide-react';

export default function DashboardPage() {
  const tenantConfig = useTenant();
  const [eventos, setEventos] = useState<EventoCarga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tenantConfig && tenantConfig.id) {
      setLoading(true);
      mockApi.getEventosCarga(tenantConfig.id).then(data => {
        setEventos(data);
        setLoading(false);
      });
    }
  }, [tenantConfig, tenantConfig.id]);

  // --- Process data for KPIs and Charts ---
  const kpis = {
    totalLitros: eventos.reduce((acc, e) => acc + e.litros, 0),
    costoTotal: eventos.reduce((acc, e) => acc + (e.costo_total || 0), 0),
    cargasRealizadas: eventos.length,
  };

  const litrosPorVehiculo = eventos.reduce((acc, e) => {
    const vehiculoName = `Vehículo ${e.id_vehiculo.slice(-2)}`; // Short name for demo
    if (!acc[vehiculoName]) {
      acc[vehiculoName] = 0;
    }
    acc[vehiculoName] += e.litros;
    return acc;
  }, {} as { [key: string]: number });

  const chartDataVehiculos = Object.entries(litrosPorVehiculo).map(([vehiculo, litros]) => ({
    vehiculo,
    litros,
  }));
  
  const cargasPorDia = eventos.reduce((acc, e) => {
    const fecha = new Date(e.fecha).toLocaleDateString('es-CL', { month: 'short', day: 'numeric' });
     if (!acc[fecha]) {
      acc[fecha] = 0;
    }
    acc[fecha] += 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartDataCargas = Object.entries(cargasPorDia).map(([fecha, cargas]) => ({
    fecha,
    cargas,
  })).reverse();


  const chartConfig: ChartConfig = {
    litros: {
      label: 'Litros',
      color: '#2563eb',
    },
    cargas: {
        label: 'Cargas',
        color: '#60a5fa'
    }
  };

  if (loading) {
    return <div>Cargando dashboard...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.costoTotal.toLocaleString('es-CL')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Litros Cargados</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalLitros.toLocaleString('es-CL')} L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargas Realizadas</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{kpis.cargasRealizadas}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Litros por Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={chartDataVehiculos} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="vehiculo"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="litros" fill="var(--color-litros)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cargas por Día</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={chartDataCargas} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="fecha"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="cargas" stroke="var(--color-cargas)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}