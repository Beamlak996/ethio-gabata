"use client";

import {
  BarChart,
  Network,
  User,
  Users,
  CircleDollarSign,
  Package,
  FolderTree,
  DollarSign,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { InviteModal } from "@/components/modal/invite-modal";
import Link from "next/link";
import { useWithdrawModal } from "@/hooks/use-withdraw-request";

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
  {
    icon: DollarSign,
    label: "Withdraw",
    href: "/admin/withdraw",
  },
];

export const SidebarRoutes = () => {
  const userRole = useCurrentRole();
  const user = useCurrentUser();
  const { open } = useWithdrawModal();
  const router = useRouter();

  if(!user) return redirect('/')


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
    {
      icon: FolderTree,
      label: "Generate Family",
      href: "/family",
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
        <Button
          variant="add"
          size="sm"
          onClick={() => router.push("/add-user")}
        >
          Add User
        </Button>
        <InviteModal>
          <Button variant="success" size="sm">
            Invite user
          </Button>
        </InviteModal>
        {userRole === "USER" && (
          <Button variant="success" size="sm" onClick={()=>open(user.id||"")} >
            Withdraw Request
          </Button>
        )}
      </div>
    </div>
  );
};
