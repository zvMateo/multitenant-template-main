import { useForm } from "react-hook-form";

const ROLES = ["operator", "supervisor", "auditor", "admin", "superadmin"];

export function UserForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "operator",
      enabled: true,
    },
  });

  const submitHandler = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name", { required: true })}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">Name is required</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="border rounded px-2 py-1 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">Email is required</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <select
          {...register("role")}
          className="border rounded px-2 py-1 w-full"
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Enabled</label>
        <input type="checkbox" {...register("enabled")} />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Save User
      </button>
    </form>
  );
}
