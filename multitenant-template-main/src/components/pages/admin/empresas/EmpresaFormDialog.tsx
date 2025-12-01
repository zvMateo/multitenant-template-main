// src/components/pages/admin/empresas/EmpresaFormDialog.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empresa } from '@/types/common';
import { useEffect } from 'react';
import { useCreateEmpresa, useUpdateEmpresa } from '@/hooks/api/use-empresas';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const empresaFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  rut: z.string().min(5, {
    message: 'El RUT debe tener al menos 5 caracteres.',
  }),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email({
    message: 'Ingrese un correo electrónico válido.',
  }).optional().or(z.literal('')),
  // Configuracion, fechaCreacion, activo are handled internally or not directly editable via this form
  activo: z.boolean().default(true),
  configuracion: z.object({
    evidenciasObligatorias: z.array(z.string()),
    umbrales: z.object({
      litrosMaximos: z.number().min(0),
    }),
    preciosCombustible: z.record(z.string(), z.number()),
  }).optional(),
});

type EmpresaFormValues = z.infer<typeof empresaFormSchema>;

interface EmpresaFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: Empresa;
}

export function EmpresaFormDialog({ isOpen, onClose, empresa }: EmpresaFormDialogProps) {
  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: {
      nombre: '',
      rut: '',
      direccion: '',
      telefono: '',
      email: '',
      activo: true,
      configuracion: { // Provide a default empty configuration
        evidenciasObligatorias: [],
        umbrales: { litrosMaximos: 0 },
        preciosCombustible: {},
      },
    },
  });

  const createEmpresaMutation = useCreateEmpresa();
  const updateEmpresaMutation = useUpdateEmpresa();

  useEffect(() => {
    if (empresa) {
      form.reset({
        nombre: empresa.nombre,
        rut: empresa.rut,
        direccion: empresa.direccion,
        telefono: empresa.telefono,
        email: empresa.email,
        activo: empresa.activo,
        configuracion: empresa.configuracion,
      });
    } else {
      form.reset();
    }
  }, [empresa, form]);

  const onSubmit = async (values: EmpresaFormValues) => {
    try {
      if (empresa) {
        // Update existing empresa
        await updateEmpresaMutation.mutateAsync({ id: empresa.id, ...values });
      } else {
        // Create new empresa
        await createEmpresaMutation.mutateAsync(values);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // TODO: Show a toast or alert for error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{empresa ? 'Editar Empresa' : 'Agregar Empresa'}</DialogTitle>
          <DialogDescription>
            {empresa
              ? 'Modifica los detalles de la empresa existente.'
              : 'Completa los campos para agregar una nueva empresa.'}
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
                    <Input placeholder="Nombre de la empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <Input placeholder="RUT de la empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Dirección de la empresa" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email de contacto" {...field} />
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
                    <FormLabel className="text-base">Activa</FormLabel>
                    <FormDescription>
                      Define si la empresa está activa en el sistema.
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
             {/* Configuration fields could be added here if they are directly editable */}
            <Button type="submit" disabled={createEmpresaMutation.isPending || updateEmpresaMutation.isPending}>
              {empresa ? 'Guardar Cambios' : 'Crear Empresa'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
