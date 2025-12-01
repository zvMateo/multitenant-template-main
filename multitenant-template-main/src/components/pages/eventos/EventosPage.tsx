import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockApi } from "@/api/mock";
import type { EventoCarga } from "@/types/common";
import { useTenant } from "@/components/providers/tenants/use-tenant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Paperclip } from "lucide-react";

const EventoDetailDialog = ({ evento }: { evento: EventoCarga }) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Detalle del Evento: {evento.id}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          <p>
            <strong>Usuario:</strong> {evento.id_usuario}
          </p>
          <p>
            <strong>Vehículo:</strong> {evento.id_vehiculo}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}
          </p>
          <p>
            <strong>Litros:</strong> {evento.litros} L
          </p>
          <p>
            <strong>Costo:</strong> ${(evento.costo_total || 0).toLocaleString()}
          </p>
          <p>
            <strong>Odómetro/Horómetro:</strong> {evento.odometro_horometro}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Paperclip className="h-4 w-4" /> Evidencias
          </h4>
          <div className="flex gap-2 flex-wrap">
            {evento.evidencias.map((ev) => (
              <a
                key={ev.id}
                href={ev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <img
                  src={ev.url}
                  alt={ev.tipo}
                  className="h-24 w-24 object-cover rounded-md border"
                />
                <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-xs text-center rounded-b-md">
                  {ev.tipo}
                </p>
              </a>
            ))}
            {evento.evidencias.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No hay evidencias adjuntas.
              </p>
            )}
          </div>
        </div>
        {evento.observaciones && (
          <div>
            <h4 className="font-semibold mb-1">Observaciones</h4>
            <p className="text-sm text-muted-foreground p-2 bg-stone-100 rounded-md">
              {evento.observaciones}
            </p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default function EventosPage() {
  const tenantConfig = useTenant();
  const [eventos, setEventos] = useState<EventoCarga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tenantConfig && tenantConfig.id) {
      setLoading(true);
      mockApi.getEventosCarga(tenantConfig.id).then((data) => {
        setEventos(data);
        setLoading(false);
      });
    }
  }, [tenantConfig]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos de Carga</CardTitle>
        <CardDescription>
          Historial de todas las cargas de combustible registradas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Vehículo</TableHead>
              <TableHead>Litros</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : (
              eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell>
                    {new Date(evento.fecha).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Vehículo {evento.id_vehiculo.slice(-2)}</TableCell>
                  <TableCell>{evento.litros} L</TableCell>
                  <TableCell>
                    <Badge variant={evento.validado ? "default" : "secondary"}>
                      {evento.validado ? "Validado" : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" /> Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <EventoDetailDialog evento={evento} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
