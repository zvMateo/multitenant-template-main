import { useCreateEmpresa } from "@/hooks/api/use-empresas";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function EmpresaForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useCreateEmpresa();

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
      <input {...register("rut")} placeholder="RUT" className="input" />
      <input
        {...register("direccion")}
        placeholder="Dirección"
        className="input"
      />
      <input
        {...register("telefono")}
        placeholder="Teléfono"
        className="input"
      />
      <input {...register("email")} placeholder="Email" className="input" />
      <Button type="submit" disabled={isLoading}>
        Guardar
      </Button>
    </form>
  );
}
