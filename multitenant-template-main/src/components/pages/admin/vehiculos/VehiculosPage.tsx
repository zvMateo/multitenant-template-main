import { useVehiculos } from "@/hooks/api/use-vehiculos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Truck, Car, Tractor } from "lucide-react"; // Iconos sugeridos

export default function VehiculosPage() {
  const { vehiculos, isLoading, isError } = useVehiculos();

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError)
    return <div className="text-red-500">Error al cargar vehículos</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Flota de Vehículos
        </h1>
        <Button>+ Nuevo Vehículo</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehiculos.map((vehiculo) => (
          <Card key={vehiculo.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {vehiculo.marca} {vehiculo.modelo}
              </CardTitle>
              {getIconoVehiculo(vehiculo.tipo)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehiculo.patente}</div>
              <p className="text-xs text-muted-foreground mb-4">
                {vehiculo.tipo.toUpperCase()} - {vehiculo.anio}
              </p>
              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    vehiculo.estado === "activo" ? "default" : "destructive"
                  }
                >
                  {vehiculo.estado}
                </Badge>
                <span className="text-sm font-mono">
                  {vehiculo.ultimoOdometro} km
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getIconoVehiculo(tipo: string) {
  switch (tipo) {
    case "camion":
      return <Truck className="h-4 w-4 text-muted-foreground" />;
    case "maquinaria":
      return <Tractor className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Car className="h-4 w-4 text-muted-foreground" />;
  }
}
