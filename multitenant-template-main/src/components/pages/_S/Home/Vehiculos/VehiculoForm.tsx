// src/components/pages/_S/Home/Vehiculos/VehiculoForm.tsx
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehiculoFormSchema, type VehiculoFormValues } from "@/schemas/forms";
// Verifica que este import no tenga errores ahora
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
import { toast } from "sonner";

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
    // Mapeo de tipos del Form (Upper) a la API (Lower/Specific)
    const mappedTipo =
      values.tipo === "MAQUINARIA"
        ? ("maquinaria" as const)
        : ("automovil" as const);

    const payload = {
      // Campos requeridos por Omit<Vehiculo, ...>
      nombre: values.descripcion, // Usamos descripcion como nombre
      patente: values.patente,
      marca: "Generica", // Valor por defecto si no está en el form
      modelo: "Modelo Base", // Valor por defecto
      tipo: mappedTipo,
      kilometrajeInicial: Number(values.odometroActual),
      consumoEsperado: { lt_km: 10 }, // Valor por defecto para evitar error de tipo
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Vehículo creado correctamente");
        form.reset();
        onSuccess?.();
      },
      onError: (error) => {
        console.error(error);
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

        {/* Descripción / Nombre */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre / Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Camioneta Ford Ranger" {...field} />
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
                      <SelectValue placeholder="Seleccionar" />
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
                <FormLabel>Odómetro (km)</FormLabel>
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
