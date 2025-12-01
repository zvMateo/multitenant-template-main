import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";

export function HeaderContext() {
  const tenant = useTenant();
  const unit = useUnit();
  const { role } = useRole();

  return (
    <header className="w-full bg-gray-50 border-b px-4 py-2 flex items-center justify-between">
      <div>
        <span className="font-bold">Tenant:</span> {tenant?.name}
        {unit && <span className="ml-4 font-bold">Unit:</span>} {unit?.name}
      </div>
      <div>
        <span className="font-bold">Role:</span> {role}
      </div>
    </header>
  );
}
