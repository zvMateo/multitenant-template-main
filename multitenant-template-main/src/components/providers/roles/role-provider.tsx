import React, { useState } from "react";
import { RoleContext, type Role } from "./role-context";

interface RoleProviderProps {
  children: React.ReactNode;
  initialRole?: Role;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({
  children,
  initialRole = null,
}) => {
  const [role, setRole] = useState<Role | null>(initialRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
