import { createContext } from "react";
import type { TenantConfig } from "@/types/tenant";

export const TenantContext = createContext<TenantConfig | undefined>(undefined);
