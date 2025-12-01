import { useEffect, useState } from "react";
import { useTenant } from "@/components/providers/tenants/use-tenant";
import { useUnit } from "@/components/providers/unit/use-unit";

// Mocked user data
const MOCK_USERS = [
  {
    id: "user1",
    name: "Juan Perez",
    email: "juan@empresa.com",
    role: "operator",
    enabled: true,
  },
  {
    id: "user2",
    name: "Ana Gómez",
    email: "ana@empresa.com",
    role: "supervisor",
    enabled: true,
  },
  {
    id: "user3",
    name: "Carlos Ruiz",
    email: "carlos@empresa.com",
    role: "auditor",
    enabled: false,
  },
];

export function UserTable() {
  const tenant = useTenant();
  const unit = useUnit();
  const [users, setUsers] = useState(MOCK_USERS);

  useEffect(() => {
    // Aquí iría la llamada a la API filtrando por tenant y unit
    // setUsers(fetchUsers(tenant.id, unit.id));
  }, [tenant, unit]);

  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Role</th>
          <th className="px-4 py-2 text-left">Enabled</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
              {user.enabled ? (
                <span className="text-green-600 font-semibold">Enabled</span>
              ) : (
                <span className="text-red-600 font-semibold">Disabled</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
