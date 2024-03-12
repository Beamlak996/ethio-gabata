"use client";

import { BarChart, Network, User, Users, CircleDollarSign } from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { InviteModal } from "@/components/modal/invite-modal";



const userRoutes = [
  {
    icon: BarChart,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Network,
    label: "Network",
    href: "/network",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: CircleDollarSign,
    label: "Upgrade package",
    href: "/billing",
  },
];

const adminRoutes = [
  {
    icon: BarChart,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    label: "Total Users",
    href: "/admin/users",
  },
];

export const SidebarRoutes = () => {
  const userRole = useCurrentRole()
  const user = useCurrentUser()

  const isAdminPage = userRole === UserRole.ADMIN ? true : false

  const routes = isAdminPage ? adminRoutes : userRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <Separator className="mt-6" />
      <div className="flex flex-col p-2 mt-2">
        <InviteModal>
          <Button variant="success" size="sm">
            Invite user
          </Button>
        </InviteModal>
      </div>
    </div>
  );
};
