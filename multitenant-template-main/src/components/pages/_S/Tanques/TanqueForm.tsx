import { useCreateTanque } from "@/hooks/api/use-tanques";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function TanqueForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useCreateTanque();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("nombre")} placeholder="Nombre" className="input" />
      <input
        {...register("capacidadLitros")}
        placeholder="Capacidad (L)"
        type="number"
        className="input"
      />
      <input
        {...register("combustibleTipo")}
        placeholder="Tipo de Combustible"
        className="input"
      />
      <input
        {...register("stockActual")}
        placeholder="Stock Actual"
        type="number"
        className="input"
      />
      <Button type="submit" disabled={isLoading}>
        Guardar
      </Button>
    </form>
  );
}
