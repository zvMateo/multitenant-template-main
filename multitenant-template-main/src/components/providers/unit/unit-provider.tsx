import { useState } from "react";
import { UnitContext } from "./unit-context";
import type { UnitBusiness } from "../../../types/unit";
import type { ReactNode } from "react";

interface UnitProviderProps {
  children: ReactNode;
  initialUnit?: UnitBusiness;
}

export const UnitProvider = ({ children, initialUnit }: UnitProviderProps) => {
  const [unit] = useState<UnitBusiness | undefined>(initialUnit);

  return <UnitContext.Provider value={unit}>{children}</UnitContext.Provider>;
};
