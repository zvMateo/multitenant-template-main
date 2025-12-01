// src/components/pages/admin/vehiculos/VehiculoFormDialog.tsx

import { useForm, type Resolver } from "react-hook-form";
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
import type { Vehiculo } from "@/types/common";
import { useEffect } from "react";
import {
  useCreateVehiculo,
  useUpdateVehiculo,
} from "@/hooks/api/use-vehiculos";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCentrosCosto } from "@/hooks/api/use-centroscosto"; // To fetch CentrosCosto for select

const vehiculoFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  patente: z.string().min(2, {
    message: "La patente debe tener al menos 2 caracteres.",
  }),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  tipo: z.enum(["camion", "maquinaria", "automovil", "otro"], {
    message: "Debe seleccionar un tipo de vehículo.",
  }),
  kilometrajeInicial: z.number().min(0, {
    message: "El kilometraje inicial debe ser un número positivo.",
  }),
  activo: z.boolean(),
  centroCostoId: z.string().optional().nullable(),
  consumoEsperado: z
    .object({
      lt_km: z.coerce.number().min(0).optional(),
      lt_hr: z.coerce.number().min(0).optional(),
    })
    .optional(),
});

type VehiculoFormValues = z.infer<typeof vehiculoFormSchema>;

interface VehiculoFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vehiculo?: Vehiculo;
}

export function VehiculoFormDialog({
  isOpen,
  onClose,
  vehiculo,
}: VehiculoFormDialogProps) {
  const form = useForm<VehiculoFormValues>({
    resolver: zodResolver(vehiculoFormSchema) as Resolver<VehiculoFormValues>,
    defaultValues: {
      nombre: "",
      patente: "",
      marca: "",
      modelo: "",
      tipo: "automovil",
      kilometrajeInicial: 0,
      activo: true,
      centroCostoId: undefined,
      consumoEsperado: {
        lt_km: undefined,
        lt_hr: undefined,
      },
    },
  });

  const createVehiculoMutation = useCreateVehiculo();
  const updateVehiculoMutation = useUpdateVehiculo();
  const { data: centrosCosto } = useCentrosCosto();

  useEffect(() => {
    if (vehiculo) {
      form.reset({
        nombre: vehiculo.nombre,
        patente: vehiculo.patente,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        tipo: vehiculo.tipo,
        kilometrajeInicial: vehiculo.kilometrajeInicial,
        activo: vehiculo.activo ?? true,
        centroCostoId: vehiculo.centroCostoId || undefined,
        consumoEsperado: vehiculo.consumoEsperado || {
          lt_km: undefined,
          lt_hr: undefined,
        },
      });
    } else {
      form.reset();
    }
  }, [vehiculo, form]);

  const onSubmit = async (values: VehiculoFormValues) => {
    try {
      if (vehiculo) {
        // Update existing vehiculo
        await updateVehiculoMutation.mutateAsync({
          id: vehiculo.id,
          ...values,
          centroCostoId: values.centroCostoId ?? undefined,
        });
      } else {
        // Create new vehiculo
        const payload = {
          nombre: values.nombre,
          patente: values.patente,
          marca: values.marca,
          modelo: values.modelo,
          tipo: values.tipo,
          kilometrajeInicial: values.kilometrajeInicial,
          centroCostoId: values.centroCostoId,
          consumoEsperado: values.consumoEsperado,
        };
        await createVehiculoMutation.mutateAsync({
          ...payload,
          marca: payload.marca ?? "",
          modelo: payload.modelo ?? "",
          centroCostoId: payload.centroCostoId ?? undefined,
          consumoEsperado: payload.consumoEsperado || {},
        });
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
            {vehiculo ? "Editar Vehículo" : "Agregar Vehículo"}
          </DialogTitle>
          <DialogDescription>
            {vehiculo
              ? "Modifica los detalles del vehículo existente."
              : "Completa los campos para agregar un nuevo vehículo."}
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
                    <Input placeholder="Nombre del vehículo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patente</FormLabel>
                  <FormControl>
                    <Input placeholder="Patente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Marca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Modelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
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
                      <SelectItem value="camion">Camión</SelectItem>
                      <SelectItem value="maquinaria">Maquinaria</SelectItem>
                      <SelectItem value="automovil">Automóvil</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kilometrajeInicial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometraje Inicial / Horómetro</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="centroCostoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de Costo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un centro de costo (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {centrosCosto?.map((cc) => (
                        <SelectItem key={cc.id} value={cc.id}>
                          {cc.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consumoEsperado.lt_km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo Esperado (Lt/Km)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consumoEsperado.lt_hr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo Esperado (Lt/Hr)</FormLabel>
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
                      Define si el vehículo está activo en el sistema.
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
                createVehiculoMutation.isPending ||
                updateVehiculoMutation.isPending
              }
            >
              {vehiculo ? "Guardar Cambios" : "Crear Vehículo"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
