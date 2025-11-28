import { useRoleContext } from "./role-context";

export const useRole = () => {
  const { role, setRole } = useRoleContext();
  return { role, setRole };
};
