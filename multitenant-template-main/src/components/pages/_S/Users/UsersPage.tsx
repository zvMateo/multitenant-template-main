import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";
import { useRole } from "@/components/providers/roles/use-role";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";

export default function UsersPage() {
  const tenant = useTenant();
  const unit = useUnit();
  const { role } = useRole();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
      <p className="text-muted-foreground">
        Create, edit, and manage users for this tenant and unit.
      </p>
      <div className="bg-white rounded shadow p-4 space-y-8">
        <UserTable />
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Add/Edit User</h3>
          <UserForm
            onSubmit={(data) => {
              // Aquí iría la lógica para agregar el usuario a la tabla o llamar a la API
              alert("User saved: " + JSON.stringify(data));
            }}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="text-sm text-gray-500">Current context:</div>
        <div className="text-base">
          <strong>Tenant:</strong> {tenant?.name} | <strong>Unit:</strong>{" "}
          {unit?.name} | <strong>Role:</strong> {role}
        </div>
      </div>
    </div>
  );
}
