import { useState } from "react";
import {
  useEmpresas,
  useUpdateEmpresa,
  useDeleteEmpresa,
} from "@/hooks/api/use-empresas";
import type { Empresa } from "@/types/common";
import { EmpresaForm } from "./EmpresaForm";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmpresasPage() {
  const { data: empresas, isLoading, isError } = useEmpresas();
  const [open, setOpen] = useState(false);
  const [editEmpresa, setEditEmpresa] = useState<Empresa | null>(null);
  const updateEmpresa = useUpdateEmpresa();
  const deleteEmpresa = useDeleteEmpresa();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar empresas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Empresas</h2>
          <p className="text-muted-foreground">
            Administra las empresas habilitadas.
          </p>
        </div>
        <Dialog
          open={open || !!editEmpresa}
          onOpenChange={() => {
            setOpen(false);
            setEditEmpresa(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nueva Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editEmpresa ? "Editar Empresa" : "Agregar Empresa"}
              </DialogTitle>
            </DialogHeader>
            <EmpresaForm
              onSuccess={() => {
                setOpen(false);
                setEditEmpresa(null);
              }}
              defaultValues={editEmpresa ?? undefined}
              onEdit={(data: Partial<Empresa>) => {
                if (editEmpresa) {
                  updateEmpresa.mutate(
                    { id: editEmpresa.id, ...data },
                    { onSuccess: () => setEditEmpresa(null) }
                  );
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No hay empresas registradas.
                </TableCell>
              </TableRow>
            ) : (
              empresas?.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.nombre}</TableCell>
                  <TableCell>{empresa.rut}</TableCell>
                  <TableCell>{empresa.direccion}</TableCell>
                  <TableCell>{empresa.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        empresa.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {empresa.activo ? "Activa" : "Inactiva"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditEmpresa(empresa as Empresa)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteEmpresa.mutate(empresa.id)}
                      className="ml-2"
                    >
                      Eliminar
                    </Button>
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
