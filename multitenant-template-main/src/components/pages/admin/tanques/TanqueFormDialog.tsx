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
import type { Tanque } from "@/types/common";
import { useEffect } from "react";
import { useCreateTanque, useUpdateTanque } from "@/hooks/api/use-tanques";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tanqueFormSchema = z
  .object({
    nombre: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    capacidadLitros: z.string()
      .transform((val) => Number(val))
      .pipe(z.number().min(1, {
        message: "La capacidad debe ser al menos 1 litro.",
      })),
    combustibleTipo: z.string().min(1, {
      message: "Debe especificar el tipo de combustible.",
    }),
    stockActual: z.string()
      .transform((val) => Number(val))
      .pipe(z.number().min(0, {
        message: "El stock actual no puede ser negativo.",
      })),
    activo: z.boolean().default(true),
  })
  .refine((data) => data.stockActual <= data.capacidadLitros, {
    message: "El stock actual no puede exceder la capacidad total.",
    path: ["stockActual"],
  });

type TanqueFormOutputValues = z.infer<typeof tanqueFormSchema>;
type TanqueFormInputValues = z.input<typeof tanqueFormSchema>;

interface TanqueFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tanque?: Tanque;
}

export function TanqueFormDialog({
  isOpen,
  onClose,
  tanque,
}: TanqueFormDialogProps) {
  const form = useForm<TanqueFormInputValues, unknown, TanqueFormOutputValues>({
    resolver: zodResolver(tanqueFormSchema),
    defaultValues: {
      nombre: "",
      capacidadLitros: "",
      combustibleTipo: "",
      stockActual: "",
      activo: true,
    },
  });

  const createTanqueMutation = useCreateTanque();
  const updateTanqueMutation = useUpdateTanque();

  useEffect(() => {
    if (tanque) {
      form.reset({
        nombre: tanque.nombre,
        capacidadLitros: String(tanque.capacidadLitros),
        combustibleTipo: tanque.combustibleTipo,
        stockActual: String(tanque.stockActual),
        activo: tanque.activo,
      });
    } else {
      form.reset({
        nombre: "",
        capacidadLitros: "",
        combustibleTipo: "",
        stockActual: "",
        activo: true,
      });
    }
  }, [tanque, form]);

  const onSubmit = async (values: TanqueFormOutputValues) => {
    try {
      if (tanque) {
        // Update existing tanque
        await updateTanqueMutation.mutateAsync({ id: tanque.id, ...values });
      } else {
        // Create new tanque
        await createTanqueMutation.mutateAsync(values);
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
            {tanque ? "Editar Tanque" : "Agregar Tanque"}
          </DialogTitle>
          <DialogDescription>
            {tanque
              ? "Modifica los detalles del tanque existente."
              : "Completa los campos para agregar un nuevo tanque."}
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
                    <Input placeholder="Nombre del tanque" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacidadLitros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad (Litros)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="combustibleTipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Combustible</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Gasolina 93">Gasolina 93</SelectItem>
                      <SelectItem value="Gasolina 95">Gasolina 95</SelectItem>
                      <SelectItem value="Gasolina 97">Gasolina 97</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockActual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Actual (Litros)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
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
                      Define si el tanque está activo en el sistema.
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
                createTanqueMutation.isPending || updateTanqueMutation.isPending
              }
            >
              {tanque ? "Guardar Cambios" : "Crear Tanque"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
