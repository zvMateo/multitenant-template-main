import { useState } from "react";
import {
  useSurtidores,
  useUpdateSurtidor,
  useDeleteSurtidor,
} from "@/hooks/api/use-surtidores";
import { SurtidorForm } from "./SurtidorForm";
import type { Surtidor } from "@/types/common";
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

export default function SurtidoresPage() {
  const { data: surtidores, isLoading, isError } = useSurtidores();
  const [open, setOpen] = useState(false);
  const [editSurtidor, setEditSurtidor] = useState<Surtidor | null>(null);
  const updateSurtidor = useUpdateSurtidor();
  const deleteSurtidor = useDeleteSurtidor();

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
        Error al cargar surtidores.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Surtidores</h2>
          <p className="text-muted-foreground">
            Administra los surtidores habilitados.
          </p>
        </div>
        <Dialog
          open={open || !!editSurtidor}
          onOpenChange={() => {
            setOpen(false);
            setEditSurtidor(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Surtidor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editSurtidor ? "Editar Surtidor" : "Agregar Surtidor"}
              </DialogTitle>
            </DialogHeader>
            <SurtidorForm
              onSuccess={() => {
                setOpen(false);
                setEditSurtidor(null);
              }}
              defaultValues={editSurtidor ?? undefined}
              onEdit={(data: Partial<Surtidor>) => {
                if (editSurtidor) {
                  updateSurtidor.mutate(
                    { id: editSurtidor.id, ...data },
                    { onSuccess: () => setEditSurtidor(null) }
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
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surtidores?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay surtidores registrados.
                </TableCell>
              </TableRow>
            ) : (
              surtidores?.map((surtidor) => (
                <TableRow key={surtidor.id}>
                  <TableCell>{surtidor.nombre}</TableCell>
                  <TableCell>{surtidor.ubicacion}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        surtidor.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {surtidor.activo ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditSurtidor(surtidor as Surtidor)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteSurtidor.mutate(surtidor.id)}
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
