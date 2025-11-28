import { useContext } from "react";
import { UnitContext } from "./unit-context";

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error("useUnit must be used within UnitProvider");
  return context;
};
