// src/components/pages/admin/tanques/TanquesPage.tsx

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useTanques, useDeleteTanque } from "@/hooks/api/use-tanques";
import type { Tanque } from "@/types/common";
import { TanqueFormDialog } from "./TanqueFormDialog"; // Will create this component next

export default function TanquesPage() {
  const { data: tanques, isLoading, isError } = useTanques();
  const deleteTanqueMutation = useDeleteTanque();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTanque, setEditingTanque] = useState<Tanque | undefined>(
    undefined
  );

  const handleAddTanque = () => {
    setEditingTanque(undefined);
    setIsFormOpen(true);
  };

  const handleEditTanque = (tanque: Tanque) => {
    setEditingTanque(tanque);
    setIsFormOpen(true);
  };

  const handleDeleteTanque = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este tanque?")) {
      deleteTanqueMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando tanques...</p>;
  }

  if (isError) {
    return <p>Error al cargar tanques.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administración de Tanques</CardTitle>
          <CardDescription>
            Administra los tanques de almacenamiento de combustible.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" onClick={handleAddTanque}>
          <PlusCircle className="h-4 w-4" />
          Agregar Tanque
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Combustible</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Stock Actual</TableHead>
              <TableHead>% Ocupado</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tanques?.map((tanque) => (
              <TableRow key={tanque.id}>
                <TableCell className="font-medium">{tanque.nombre}</TableCell>
                <TableCell>{tanque.combustibleTipo}</TableCell>
                <TableCell>
                  {tanque.capacidadLitros.toLocaleString()} L
                </TableCell>
                <TableCell>{tanque.stockActual.toLocaleString()} L</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (tanque.stockActual / tanque.capacidadLitros) * 100
                      }
                      className="w-[60%]"
                    />
                    <span>
                      {(
                        (tanque.stockActual / tanque.capacidadLitros) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={tanque.activo ? "default" : "destructive"}>
                    {tanque.activo ? "Activo" : "Inactivo"}
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
                        onClick={() => handleEditTanque(tanque)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTanque(tanque.id)}
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
      <TanqueFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        tanque={editingTanque}
      />
    </Card>
  );
}
