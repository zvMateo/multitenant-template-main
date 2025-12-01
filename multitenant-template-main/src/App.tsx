import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { TenantProvider } from "./components/providers/tenants/tenant-provider";
import { UnitProvider } from "./components/providers/unit/unit-provider";
import { ThemeProvider } from "./components/providers/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { Routing } from "./routes/routes";
import { HeaderContext } from "./components/layout/HeaderContext";
import { RoleProvider } from "./components/providers/roles/role-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <UnitProvider
          initialUnit={{
            id: "unit1",
            name: "Default Unit",
            domain: "localhost",
          }}
        >
          <RoleProvider>
            <ThemeProvider
              defaultTheme="system"
              storageKey="multitenant-ui-theme"
            >
              <HeaderContext />
              <Routing />
              <Toaster />
            </ThemeProvider>
          </RoleProvider>
        </UnitProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
}

export default App;
