import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { TenantProvider } from "./components/providers/tenants/tenant-provider";
import { UnitProvider } from "./components/providers/unit/unit-provider";
import { ThemeProvider } from "./components/providers/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { Routing } from "./routes/routes";

const queryClient = new QueryClient();

import { RoleProvider } from "./components/providers/roles/role-provider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <UnitProvider>
          <RoleProvider>
            <ThemeProvider
              defaultTheme="system"
              storageKey="multitenant-ui-theme"
            >
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
