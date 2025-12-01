// src/components/pages/admin/surtidores/SurtidorFormDialog.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Surtidor } from "@/types/common";
import { useEffect } from "react";
import {
  useCreateSurtidor,
  useUpdateSurtidor,
} from "@/hooks/api/use-surtidores";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const surtidorFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  ubicacion: z.string().min(2, {
    message: "La ubicación debe tener al menos 2 caracteres.",
  }),
  activo: z.boolean().default(true),
});

type SurtidorFormValues = z.infer<typeof surtidorFormSchema>;

interface SurtidorFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  surtidor?: Surtidor;
}

export function SurtidorFormDialog({
  isOpen,
  onClose,
  surtidor,
}: SurtidorFormDialogProps) {
  const form = useForm<SurtidorFormValues>({
    resolver: zodResolver(surtidorFormSchema),
    defaultValues: {
      nombre: "",
      ubicacion: "",
      activo: true,
    },
  });

  const createSurtidorMutation = useCreateSurtidor();
  const updateSurtidorMutation = useUpdateSurtidor();

  useEffect(() => {
    if (surtidor) {
      form.reset({
        nombre: surtidor.nombre,
        ubicacion: surtidor.ubicacion,
        activo: surtidor.activo,
      });
    } else {
      form.reset();
    }
  }, [surtidor, form]);

  const onSubmit = async (values: SurtidorFormValues) => {
    try {
      if (surtidor) {
        // Update existing surtidor
        await updateSurtidorMutation.mutateAsync({
          id: surtidor.id,
          ...values,
        });
      } else {
        // Create new surtidor
        await createSurtidorMutation.mutateAsync(values);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // TODO: Show a toast or alert for error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {surtidor ? "Editar Surtidor" : "Agregar Surtidor"}
          </DialogTitle>
          <DialogDescription>
            {surtidor
              ? "Modifica los detalles del surtidor existente."
              : "Completa los campos para agregar un nuevo surtidor."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del surtidor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ubicación del surtidor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Activo</FormLabel>
                    <FormDescription>
                      Define si el surtidor está activo en el sistema.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                createSurtidorMutation.isPending ||
                updateSurtidorMutation.isPending
              }
            >
              {surtidor ? "Guardar Cambios" : "Crear Surtidor"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
