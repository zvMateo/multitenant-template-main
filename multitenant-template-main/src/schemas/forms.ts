import { z } from "zod";

export const VehiculoFormSchema = z.object({
  patente: z.string().min(6, "La patente es muy corta").max(10),
  descripcion: z.string().min(3, "Requerido"),
  tipo: z.enum(["VEHICULO", "MAQUINARIA"]),
  odometroActual: z.coerce.number().min(0),
});

export const UsuarioFormSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(10, "Formato internacional requerido para WhatsApp"), // Req 3.1
  rol: z.enum(["OPERADOR", "SUPERVISOR", "AUDITOR"]),
  whitelistWhatsApp: z.boolean().default(true),
});

export type VehiculoFormValues = z.infer<typeof VehiculoFormSchema>;
export type UsuarioFormValues = z.infer<typeof UsuarioFormSchema>;
