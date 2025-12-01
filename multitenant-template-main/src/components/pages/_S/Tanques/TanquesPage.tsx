import { useState } from "react";
import {
  useTanques,
  useUpdateTanque,
  useDeleteTanque,
} from "@/hooks/api/use-tanques";
import { TanqueForm } from "./TanqueForm";
import type { Tanque } from "@/types/common";
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

export default function TanquesPage() {
  const { data: tanques, isLoading, isError } = useTanques();
  const [open, setOpen] = useState(false);
  const [editTanque, setEditTanque] = useState<Tanque | null>(null);
  const updateTanque = useUpdateTanque();
  const deleteTanque = useDeleteTanque();

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
        Error al cargar tanques.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tanques</h2>
          <p className="text-muted-foreground">
            Administra los tanques habilitados.
          </p>
        </div>
        <Dialog
          open={open || !!editTanque}
          onOpenChange={() => {
            setOpen(false);
            setEditTanque(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Tanque
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editTanque ? "Editar Tanque" : "Agregar Tanque"}
              </DialogTitle>
            </DialogHeader>
            <TanqueForm
              onSuccess={() => {
                setOpen(false);
                setEditTanque(null);
              }}
              defaultValues={editTanque ?? undefined}
              onEdit={(data: Partial<Tanque>) => {
                if (editTanque) {
                  updateTanque.mutate(
                    { id: editTanque.id, ...data },
                    { onSuccess: () => setEditTanque(null) }
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
              <TableHead>Capacidad (L)</TableHead>
              <TableHead>Tipo Combustible</TableHead>
              <TableHead>Stock Actual</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tanques?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No hay tanques registrados.
                </TableCell>
              </TableRow>
            ) : (
              tanques?.map((tanque) => (
                <TableRow key={tanque.id}>
                  <TableCell>{tanque.nombre}</TableCell>
                  <TableCell>{tanque.capacidadLitros}</TableCell>
                  <TableCell>{tanque.combustibleTipo}</TableCell>
                  <TableCell>{tanque.stockActual}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tanque.activo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tanque.activo ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditTanque(tanque as Tanque)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTanque.mutate(tanque.id)}
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
