// src/components/pages/admin/centroscosto/CentrosCostoPage.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCentrosCosto, useDeleteCentroCosto } from '@/hooks/api/use-centroscosto';
import { CentroCosto } from '@/types/common';
import { CentroCostoFormDialog } from './CentroCostoFormDialog'; // Will create this component next

export default function CentrosCostoPage() {
  const { data: centrosCosto, isLoading, isError } = useCentrosCosto();
  const deleteCentroCostoMutation = useDeleteCentroCosto();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCentroCosto, setEditingCentroCosto] = useState<CentroCosto | undefined>(undefined);

  const handleAddCentroCosto = () => {
    setEditingCentroCosto(undefined);
    setIsFormOpen(true);
  };

  const handleEditCentroCosto = (centroCosto: CentroCosto) => {
    setEditingCentroCosto(centroCosto);
    setIsFormOpen(true);
  };

  const handleDeleteCentroCosto = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este centro de costo?')) {
      deleteCentroCostoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando centros de costo...</p>;
  }

  if (isError) {
    return <p>Error al cargar centros de costo.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administración de Centros de Costo</CardTitle>
          <CardDescription>
            Gestiona los centros de costo de tu empresa.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" onClick={handleAddCentroCosto}>
          <PlusCircle className="h-4 w-4" />
          Agregar Centro de Costo
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centrosCosto?.map(cc => (
              <TableRow key={cc.id}>
                <TableCell className="font-medium">{cc.nombre}</TableCell>
                <TableCell>{cc.descripcion}</TableCell>
                <TableCell>
                  <Badge variant={cc.activo ? 'default' : 'destructive'}>
                    {cc.activo ? 'Activo' : 'Inactivo'}
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
                      <DropdownMenuItem onClick={() => handleEditCentroCosto(cc)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCentroCosto(cc.id)}>
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
      <CentroCostoFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        centroCosto={editingCentroCosto}
      />
    </Card>
  );
}
