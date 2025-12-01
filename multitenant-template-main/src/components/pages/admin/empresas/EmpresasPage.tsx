// src/components/pages/admin/empresas/EmpresasPage.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { MoreHorizontal } from 'lucide-react';
import { useEmpresas, useDeleteEmpresa } from '@/hooks/api/use-empresas';
import { Empresa } from '@/types/common';
import { useState } from 'react';
import { EmpresaFormDialog } from './EmpresaFormDialog'; // Will create this component next

export default function EmpresasPage() {
  const { data: empresas, isLoading, isError } = useEmpresas();
  const deleteEmpresaMutation = useDeleteEmpresa();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | undefined>(undefined);

  const handleAddCompany = () => {
    setEditingEmpresa(undefined);
    setIsFormOpen(true);
  };

  const handleEditCompany = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setIsFormOpen(true);
  };

  const handleDeleteCompany = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta empresa?')) {
      deleteEmpresaMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando empresas...</p>;
  }

  if (isError) {
    return <p>Error al cargar empresas.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Administración de Empresas</CardTitle>
          <CardDescription>Gestiona las empresas del sistema.</CardDescription>
        </div>
        <Button onClick={handleAddCompany}>Agregar Empresa</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Activa</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas?.map((empresa) => (
              <TableRow key={empresa.id}>
                <TableCell>{empresa.nombre}</TableCell>
                <TableCell>{empresa.rut}</TableCell>
                <TableCell>{empresa.email}</TableCell>
                <TableCell>{empresa.telefono}</TableCell>
                <TableCell>{empresa.activo ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditCompany(empresa)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCompany(empresa.id)}>
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
      <EmpresaFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        empresa={editingEmpresa}
      />
    </Card>
  );
}