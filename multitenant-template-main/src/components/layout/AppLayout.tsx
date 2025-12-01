import { NavLink, useLocation, Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { navLinks } from "./nav-links";
import { useTenant } from "@/components/providers/tenants/use-tenant";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function NavLinks() {
  const location = useLocation();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <NavLink to={link.href}>
            {({ isActive }) => (
              <SidebarMenuButton
                isActive={isActive || location.pathname === link.href}
              >
                {link.icon}
                <span>{link.label}</span>
              </SidebarMenuButton>
            )}
          </NavLink>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function AppLayout() {
  const tenant = useTenant();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarContent = (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">{tenant.name}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavLinks />
      </SidebarContent>
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100/40 dark:bg-neutral-900/40">
        {!isMobile && <Sidebar>{sidebarContent}</Sidebar>}

        <div className="flex-1 flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white dark:bg-neutral-950 px-6">
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <Sidebar className="w-full border-r-0">
                    {sidebarContent}
                  </Sidebar>
                </SheetContent>
              </Sheet>
            )}
            <div className="w-full flex-1">
              {/* Can add search bar or other header content here */}
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            {/* User menu can go here */}
          </header>

          <main className="flex-1 p-4 sm:px-6 sm:py-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
