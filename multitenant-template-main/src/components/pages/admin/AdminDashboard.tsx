// src/components/pages/admin/AdminDashboard.tsx

import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis,
} from 'recharts';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig
} from '@/components/ui/chart';
import {
  useDashboardKPIs,
  useEventosRecientes,
  useLitrosPorDia,
  useLitrosPorVehiculo,
} from "@/hooks/api/use-dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export function AdminDashboard() {
  const tenantConfig = useTenant();
  const unit = useUnit(); // Assuming useUnit also returns an object with a 'name' property
  const { role } = useRole(); // Assuming useRole returns an object with a 'role' property

  const {
    data: kpis,
    isLoading: kpisLoading,
    isError: kpisError,
  } = useDashboardKPIs();
  const {
    data: eventosRecientes,
    isLoading: eventosLoading,
    isError: eventosError,
  } = useEventosRecientes();
  const {
    data: litrosPorDia,
    isLoading: litrosPorDiaLoading,
    isError: litrosPorDiaError,
  } = useLitrosPorDia();
  const {
    data: litrosPorVehiculo,
    isLoading: litrosPorVehiculoLoading,
    isError: litrosPorVehiculoError,
  } = useLitrosPorVehiculo();

  if (
    kpisLoading ||
    eventosLoading ||
    litrosPorDiaLoading ||
    litrosPorVehiculoLoading
  ) {
    return <p>Cargando dashboard...</p>;
  }

  if (
    kpisError ||
    eventosError ||
    litrosPorDiaError ||
    litrosPorVehiculoError
  ) {
    return <p>Error al cargar el dashboard.</p>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-CL").format(value);
  };

  const litrosPorDiaChartConfig = {
    litros: {
      label: 'Litros',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const litrosPorVehiculoChartConfig = {
    litros: {
      label: 'Litros',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Administrativo</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Litros Totales
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(kpis?.totalLitros || 0)} L
            </div>
            <p className="text-xs text-muted-foreground">
              Total de combustible cargado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(kpis?.totalCosto || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Costo total de combustible
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Validados
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis?.porcentajeValidados.toFixed(1) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Porcentaje de cargas validadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Abiertas
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12H4l2-3H20l2-3H4" />
              <path d="M3 2v6h18V2" />
              <path d="M3 18v4h18v-4" />
              <path d="M22 12H4l2 3H20l2 3H4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis?.alertasAbiertas || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Alertas pendientes de revisión
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Litros Cargados por Día</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {litrosPorDia && (
              <ChartContainer config={litrosPorDiaChartConfig} className="min-h-[200px] w-full">
                <LineChart
                  accessibilityLayer
                  data={litrosPorDia}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("es-CL", {
                        day: "numeric",
                        month: "short",
                      });
                    }}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="var(--color-litros)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stock de Tanques</CardTitle>
            <CardDescription>
              Niveles actuales de combustible en los tanques.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpis?.stockTanques.map((tanque) => (
                <div
                  key={tanque.tanqueId}
                  className="flex items-center space-x-4"
                >
                  <span className="w-24">{tanque.nombre}</span>
                  <Progress value={tanque.porcentaje} className="grow" />
                  <span className="w-16 text-right">
                    {tanque.porcentaje.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Litros por Vehículo</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {litrosPorVehiculo && (
              <ChartContainer config={litrosPorVehiculoChartConfig} className="min-h-[200px] w-full">
                <BarChart
                  accessibilityLayer
                  data={litrosPorVehiculo}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="nombre"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="litros"
                    fill="var(--color-litros)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Eventos Recientes</CardTitle>
            <CardDescription>
              Últimas cargas de combustible registradas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Litros</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventosRecientes?.map((evento) => (
                  <TableRow key={evento.id}>
                    <TableCell>{evento.id_vehiculo}</TableCell>
                    <TableCell>{evento.litros} L</TableCell>
                    <TableCell>
                      {new Date(evento.fecha).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="mb-2">
        Tenant: <span className="font-mono">{tenantConfig?.name}</span>
      </div>
      <div className="mb-2">
        Unit: <span className="font-mono">{unit?.name}</span>
      </div>
      <div className="mb-2">
        Role: <span className="font-mono">{role}</span>
      </div>
    </div>
  );
}
