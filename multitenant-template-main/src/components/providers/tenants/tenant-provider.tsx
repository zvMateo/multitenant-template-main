import { TenantContext } from "./tenant-context";
import { useTenantDomain } from "@/hooks/use-tenant-domain";
import type { TenantConfig } from "@/types/tenant";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

const getTenantConfig = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<TenantConfig> => {
  const tenant = queryKey[1];
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: tenant,
        name: tenant,
        theme: getTenantTheme(tenant),
      });
    }, 1000);
  });
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider = ({ children }: TenantProviderProps) => {
  const tenant = useTenantDomain();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tenant-config", tenant],
    queryFn: getTenantConfig,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading tenant configuration...</div>;
  if (isError) return <div>Error loading tenant configuration.</div>;

  return (
    <TenantContext.Provider value={data}>{children}</TenantContext.Provider>
  );
};

function getTenantTheme(tenant: string): string {
  const themes: Record<string, string> = {
    clienta: "blue",
    clientb: "green",
    clientc: "red",
    default: "",
  };
  return themes[tenant] || themes.default;
}
