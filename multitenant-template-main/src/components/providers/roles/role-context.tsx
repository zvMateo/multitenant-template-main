import { createContext, useContext } from "react";

export type Role =
  | "operator"
  | "supervisor"
  | "auditor"
  | "admin"
  | "superadmin";

export interface RoleContextType {
  role: Role | null;
  setRole: (role: Role) => void;
}

export const RoleContext = createContext<RoleContextType | undefined>(
  undefined
);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};
