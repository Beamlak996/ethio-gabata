"use client";

import {
  BarChart,
  Network,
  User,
  Users,
  CircleDollarSign,
  Package,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { InviteModal } from "@/components/modal/invite-modal";
import Link from "next/link";

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
  {
    icon: Package,
    label: "Packages",
    href: "/admin/packages",
  },
];

export const SidebarRoutes = () => {
  const userRole = useCurrentRole();
  const user = useCurrentUser();

  const router = useRouter()

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
      href: `/user/${user?.id}`,
    },
    {
      icon: CircleDollarSign,
      label: "Upgrade package",
      href: "/packages",
    },
  ];

  const isAdminPage = userRole === UserRole.ADMIN ? true : false;

  const routes = isAdminPage ? adminRoutes : userRoutes;

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
      <div className="flex flex-col p-2 mt-2 gap-4">
          <Button variant="add" size="sm" onClick={()=>router.push('/add-user')} >
            Add User
          </Button>
        <InviteModal>
          <Button variant="success" size="sm">
            Invite user
          </Button>
        </InviteModal>
      </div>
    </div>
  );
};
