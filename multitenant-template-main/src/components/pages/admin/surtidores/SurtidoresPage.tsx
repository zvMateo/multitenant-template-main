// src/components/pages/admin/surtidores/SurtidoresPage.tsx

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
import { useSurtidores, useDeleteSurtidor } from "@/hooks/api/use-surtidores";
import type { Surtidor } from "@/types/common";
import { SurtidorFormDialog } from "./SurtidorFormDialog"; // Will create this component next

export default function SurtidoresPage() {
  const { data: surtidores, isLoading, isError } = useSurtidores();
  const deleteSurtidorMutation = useDeleteSurtidor();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSurtidor, setEditingSurtidor] = useState<Surtidor | undefined>(
    undefined
  );

  const handleAddSurtidor = () => {
    setEditingSurtidor(undefined);
    setIsFormOpen(true);
  };

  const handleEditSurtidor = (surtidor: Surtidor) => {
    setEditingSurtidor(surtidor);
    setIsFormOpen(true);
  };

  const handleDeleteSurtidor = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este surtidor?")) {
      deleteSurtidorMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando surtidores...</p>;
  }

  if (isError) {
    return <p>Error al cargar surtidores.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administración de Surtidores</CardTitle>
          <CardDescription>
            Administra los surtidores de combustible de tu empresa.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" onClick={handleAddSurtidor}>
          <PlusCircle className="h-4 w-4" />
          Agregar Surtidor
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surtidores?.map((surtidor) => (
              <TableRow key={surtidor.id}>
                <TableCell className="font-medium">{surtidor.nombre}</TableCell>
                <TableCell>{surtidor.ubicacion}</TableCell>
                <TableCell>
                  <Badge variant={surtidor.activo ? "default" : "destructive"}>
                    {surtidor.activo ? "Activo" : "Inactivo"}
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
                        onClick={() => handleEditSurtidor(surtidor)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteSurtidor(surtidor.id)}
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
      <SurtidorFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        surtidor={editingSurtidor}
      />
    </Card>
  );
}
