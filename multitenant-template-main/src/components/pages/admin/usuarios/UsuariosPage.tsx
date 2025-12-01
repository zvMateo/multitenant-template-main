// src/components/pages/admin/usuarios/UsuariosPage.tsx

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
import { useUsuarios, useDeleteUsuario } from "@/hooks/api/use-usuarios";
import type { Usuario } from "@/types/common";
import { UsuarioFormDialog } from "./UsuarioFormDialog"; // Will create this component next

export default function UsuariosPage() {
  const { data: usuarios, isLoading, isError } = useUsuarios();
  const deleteUsuarioMutation = useDeleteUsuario();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | undefined>(
    undefined
  );

  const handleAddUsuario = () => {
    setEditingUsuario(undefined);
    setIsFormOpen(true);
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setIsFormOpen(true);
  };

  const handleDeleteUsuario = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      deleteUsuarioMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Cargando usuarios...</p>;
  }

  if (isError) {
    return <p>Error al cargar usuarios.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administración de Usuarios</CardTitle>
          <CardDescription>
            Gestiona los usuarios de tu empresa.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" onClick={handleAddUsuario}>
          <PlusCircle className="h-4 w-4" />
          Agregar Usuario
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios?.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">
                  {usuario.nombre} {usuario.apellido}
                </TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  {usuario.roles.map((role) => (
                    <Badge key={role} variant="outline" className="mr-1">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>
                  <Badge
                    variant={usuario.habilitado ? "default" : "destructive"}
                  >
                    {usuario.habilitado ? "Habilitado" : "Deshabilitado"}
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
                        onClick={() => handleEditUsuario(usuario)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteUsuario(usuario.id)}
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
      <UsuarioFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        usuario={editingUsuario}
      />
    </Card>
  );
}
