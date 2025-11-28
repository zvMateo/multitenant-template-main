import { createContext } from "react";

export interface UnidadNegocio {
  id: string;
  nombre: string;
  dominio: string;
}

export const UnidadContext = createContext<UnidadNegocio | undefined>(
  undefined
);
