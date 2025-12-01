import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehiculoFormSchema, type VehiculoFormValues } from "@/schemas/forms";
import { useCreateVehiculo } from "@/hooks/api/use-vehiculos";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Usamos sonner para notificaciones

interface VehiculoFormProps {
  onSuccess?: () => void;
}

export function VehiculoForm({ onSuccess }: VehiculoFormProps) {
  const createMutation = useCreateVehiculo();

  const form = useForm<VehiculoFormValues>({
    resolver: zodResolver(VehiculoFormSchema) as Resolver<VehiculoFormValues>,
    defaultValues: {
      patente: "",
      descripcion: "",
      tipo: "VEHICULO",
      odometroActual: 0,
    },
  });

  const onSubmit = (values: VehiculoFormValues) => {
    // Map form values to the API payload expected by useCreateVehiculo
    // Convert the form tipo ("VEHICULO" | "MAQUINARIA") to the backend expected literals.
    const mappedTipo =
      values.tipo === "MAQUINARIA"
        ? ("maquinaria" as const)
        : ("automovil" as const);

    const payload = {
      ...values,
      // Override tipo with the mapped value to satisfy the API type.
      tipo: mappedTipo,
      // Provide required properties missing from the form with sensible defaults.
      nombre: values.descripcion ?? "",
      marca: "",
      modelo: "",
      // consumoEsperado expects an object like { lt_km?: number; lt_hr?: number }
      consumoEsperado: { lt_km: 0 },
      kilometrajeInicial: values.odometroActual ?? 0,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Vehículo creado correctamente");
        form.reset();
        onSuccess?.(); // Cierra el modal
      },
      onError: () => {
        toast.error("Error al crear el vehículo");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Patente */}
        <FormField
          control={form.control}
          name="patente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patente</FormLabel>
              <FormControl>
                <Input placeholder="AA123BB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca / Modelo</FormLabel>
              <FormControl>
                <Input placeholder="Toyota Hilux" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Tipo */}
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
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VEHICULO">Vehículo</SelectItem>
                    <SelectItem value="MAQUINARIA">Maquinaria</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Odómetro */}
          <FormField
            control={form.control}
            name="odometroActual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odómetro Actual (km)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Guardando..." : "Crear Vehículo"}
        </Button>
      </form>
    </Form>
  );
}
