// src/components/pages/admin/centroscosto/CentroCostoFormDialog.tsx

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
import { CentroCosto } from '@/types/common';
import { useEffect } from 'react';
import { useCreateCentroCosto, useUpdateCentroCosto } from '@/hooks/api/use-centroscosto';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const centroCostoFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  descripcion: z.string().optional(),
  activo: z.boolean().default(true),
});

type CentroCostoFormValues = z.infer<typeof centroCostoFormSchema>;

interface CentroCostoFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  centroCosto?: CentroCosto;
}

export function CentroCostoFormDialog({ isOpen, onClose, centroCosto }: CentroCostoFormDialogProps) {
  const form = useForm<CentroCostoFormValues>({
    resolver: zodResolver(centroCostoFormSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      activo: true,
    },
  });

  const createCentroCostoMutation = useCreateCentroCosto();
  const updateCentroCostoMutation = useUpdateCentroCosto();

  useEffect(() => {
    if (centroCosto) {
      form.reset({
        nombre: centroCosto.nombre,
        descripcion: centroCosto.descripcion,
        activo: centroCosto.activo,
      });
    } else {
      form.reset();
    }
  }, [centroCosto, form]);

  const onSubmit = async (values: CentroCostoFormValues) => {
    try {
      if (centroCosto) {
        // Update existing centroCosto
        await updateCentroCostoMutation.mutateAsync({ id: centroCosto.id, ...values });
      } else {
        // Create new centroCosto
        await createCentroCostoMutation.mutateAsync(values);
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
          <DialogTitle>{centroCosto ? 'Editar Centro de Costo' : 'Agregar Centro de Costo'}</DialogTitle>
          <DialogDescription>
            {centroCosto
              ? 'Modifica los detalles del centro de costo existente.'
              : 'Completa los campos para agregar un nuevo centro de costo.'}
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
                    <Input placeholder="Nombre del centro de costo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del centro de costo (opcional)" {...field} />
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
                      Define si el centro de costo está activo en el sistema.
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
            <Button type="submit" disabled={createCentroCostoMutation.isPending || updateCentroCostoMutation.isPending}>
              {centroCosto ? 'Guardar Cambios' : 'Crear Centro de Costo'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
