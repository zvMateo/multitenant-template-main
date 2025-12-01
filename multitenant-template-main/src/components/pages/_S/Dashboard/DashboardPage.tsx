import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";

export default function DashboardPage() {
  const tenant = useTenant();
  const unit = useUnit();
  const { role } = useRole();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-muted-foreground">
        KPIs y visualizaciones principales del sistema.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPIs mockeados */}
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Litros totales</div>
          <div className="text-2xl font-bold">12,500 L</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Costo total</div>
          <div className="text-2xl font-bold">$1,250,000</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Eventos validados</div>
          <div className="text-2xl font-bold">98%</div>
        </div>
      </div>
      <div className="mt-8">
        {/* Aquí irán los gráficos y visualizaciones */}
        <div className="bg-white rounded shadow p-4 text-center text-gray-400">
          [Gráficos y visualizaciones próximamente]
        </div>
      </div>
      <div className="mt-8">
        <div className="text-sm text-gray-500">Contexto actual:</div>
        <div className="text-base">
          <strong>Tenant:</strong> {tenant?.name} | <strong>Unit:</strong>{" "}
          {unit?.name} | <strong>Role:</strong> {role}
        </div>
      </div>
    </div>
  );
}
