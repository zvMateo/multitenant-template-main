import { createContext } from "react";
import type { UnitBusiness } from "../../../types/unit";

export const UnitContext = createContext<UnitBusiness | undefined>(undefined);
