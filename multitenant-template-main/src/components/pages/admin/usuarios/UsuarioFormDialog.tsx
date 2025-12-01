// src/components/pages/admin/usuarios/UsuarioFormDialog.tsx

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
import type { Usuario, UserRole } from "@/types/common";
import { useEffect } from "react";
import { useCreateUsuario, useUpdateUsuario } from "@/hooks/api/use-usuarios";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const ALL_ROLES: UserRole[] = [
  "operador",
  "supervisor",
  "auditor",
  "admin",
  "superadmin",
];

const usuarioFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellido: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  telefono: z.string().optional(),
  roles: z.array(z.enum(ALL_ROLES)).min(1, {
    message: 'Debe seleccionar al menos un rol.',
  }),
  habilitado: z.boolean().default(true),
});

type UsuarioFormValues = z.infer<typeof usuarioFormSchema>;

interface UsuarioFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usuario?: Usuario;
}



export function UsuarioFormDialog({
  isOpen,
  onClose,
  usuario,
}: UsuarioFormDialogProps) {
  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioFormSchema) as Resolver<UsuarioFormValues>,
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      roles: [],
      habilitado: true,
    },
  });

  const createUsuarioMutation = useCreateUsuario();
  const updateUsuarioMutation = useUpdateUsuario();

  useEffect(() => {
    if (usuario) {
      form.reset({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        roles: usuario.roles,
        habilitado: usuario.habilitado ?? true,
      });
    } else {
      form.reset();
    }
  }, [usuario, form]);

  const onSubmit = async (values: UsuarioFormValues) => {
    try {
      if (usuario) {
        // Update existing usuario
        await updateUsuarioMutation.mutateAsync({ id: usuario.id, ...values });
      }
      else {
        // Create new usuario
        const payload = {
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          telefono: values.telefono ?? "",
          roles: values.roles,
        };
        await createUsuarioMutation.mutateAsync(payload);
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
            {usuario ? "Editar Usuario" : "Agregar Usuario"}
          </DialogTitle>
          <DialogDescription>
            {usuario
              ? "Modifica los detalles del usuario existente."
              : "Completa los campos para agregar un nuevo usuario."}
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
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email del usuario"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <div className="flex flex-col space-y-2">
                    {ALL_ROLES.map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, role])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== role
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habilitado"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Habilitado</FormLabel>
                    <FormDescription>
                      Define si el usuario está habilitado en el sistema.
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
                createUsuarioMutation.isPending ||
                updateUsuarioMutation.isPending
              }
            >
              {usuario ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
