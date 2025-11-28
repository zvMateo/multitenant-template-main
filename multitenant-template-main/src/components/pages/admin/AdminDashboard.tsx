import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";

export function AdminDashboard() {
  const tenant = useTenant();
  const unit = useUnit();
  const { role } = useRole();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-2">
        Tenant: <span className="font-mono">{tenant?.name}</span>
      </div>
      <div className="mb-2">
        Unit: <span className="font-mono">{unit?.name}</span>
      </div>
      <div className="mb-2">
        Role: <span className="font-mono">{role}</span>
      </div>
      {/* Aquí puedes mostrar KPIs, reportes, ABM, etc. */}
    </div>
  );
}
