import { useCreateSurtidor } from "@/hooks/api/use-surtidores";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function SurtidorForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useCreateSurtidor();

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
        {...register("ubicacion")}
        placeholder="Ubicación"
        className="input"
      />
      <Button type="submit" disabled={isLoading}>
        Guardar
      </Button>
    </form>
  );
}
