import { useState } from "react";
import { useVehiculos } from "@/hooks/api/use-vehiculos";
import { VehiculoForm } from "./VehiculoForm";
import { Button } from "@/components/ui/button";
import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Car, Tractor } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehiculosPage() {
  const { data: vehiculos, isLoading, isError } = useVehiculos();
  const [open, setOpen] = useState(false);
  const tenant = useTenant();
  const unit = useUnit();
  const { role } = useRole();

  // Renderizado de estado de carga
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  // Renderizado de error (útil mientras no hay API)
  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar vehículos. Asegúrate de que la API esté corriendo.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Context Header */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-semibold text-gray-600">Tenant:</span>
          <span className="text-base font-bold text-primary">
            {tenant?.name}
          </span>
          <span className="text-sm font-semibold text-gray-600">Unit:</span>
          <span className="text-base font-bold text-primary">{unit?.name}</span>
          <span className="text-sm font-semibold text-gray-600">Role:</span>
          <span className="text-base font-bold text-primary">{role}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vehículos</h2>
          <p className="text-muted-foreground">
            Administra la flota de vehículos y maquinaria.
          </p>
        </div>

        {/* Modal de Creación */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Vehículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Vehículo</DialogTitle>
            </DialogHeader>
            <VehiculoForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Odómetro</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehiculos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No hay vehículos registrados.
                </TableCell>
              </TableRow>
            ) : (
              vehiculos?.map((vehiculo) => (
                <TableRow key={vehiculo.id}>
                  <TableCell>
                    {vehiculo.tipo === "camion" ? (
                      <Car className="h-4 w-4 text-blue-500" />
                    ) : vehiculo.tipo === "maquinaria" ? (
                      <Tractor className="h-4 w-4 text-orange-500" />
                    ) : (
                      <span className="text-gray-500">{vehiculo.tipo}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {vehiculo.patente}
                  </TableCell>
                  <TableCell>
                    {vehiculo.marca} {vehiculo.modelo}
                  </TableCell>
                  <TableCell className="text-right">
                    {vehiculo.kilometrajeInicial.toLocaleString()} km
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        vehiculo.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vehiculo.activo ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
