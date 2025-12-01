// src/components/pages/admin/vehiculos/VehiculosPage.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useVehiculos, useDeleteVehiculo } from "@/hooks/api/use-vehiculos";
import type { Vehiculo } from "@/types/common";
import { VehiculoFormDialog } from "./VehiculoFormDialog"; // Will create this component next

export default function VehiculosPage() {
  const { data: vehiculos, isLoading, isError } = useVehiculos();
  const deleteVehiculoMutation = useDeleteVehiculo();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | undefined>(
    undefined
  );

  const handleAddVehiculo = () => {
    setEditingVehiculo(undefined);
    setIsFormOpen(true);
  };

  const handleEditVehiculo = (vehiculo: Vehiculo) => {
    setEditingVehiculo(vehiculo);
    setIsFormOpen(true);
  };

  const handleDeleteVehiculo = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
      deleteVehiculoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando vehículos...</p>;
  }

  if (isError) {
    return <p>Error al cargar vehículos.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administración de Vehículos</CardTitle>
          <CardDescription>
            Administra los vehículos y maquinaria de tu empresa.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" onClick={handleAddVehiculo}>
          <PlusCircle className="h-4 w-4" />
          Agregar Vehículo
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Kilometraje Inicial</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehiculos?.map((vehiculo) => (
              <TableRow key={vehiculo.id}>
                <TableCell className="font-medium">{vehiculo.nombre}</TableCell>
                <TableCell>{vehiculo.patente}</TableCell>
                <TableCell>
                  {vehiculo.tipo && (
                    <Badge variant="outline">
                      {vehiculo.tipo.charAt(0).toUpperCase() +
                        vehiculo.tipo.slice(1)}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{vehiculo.marca}</TableCell>
                <TableCell>{vehiculo.modelo}</TableCell>
                <TableCell>{vehiculo.kilometrajeInicial}</TableCell>
                <TableCell>
                  <Badge variant={vehiculo.activo ? "default" : "destructive"}>
                    {vehiculo.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditVehiculo(vehiculo)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteVehiculo(vehiculo.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <VehiculoFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        vehiculo={editingVehiculo}
      />
    </Card>
  );
}
