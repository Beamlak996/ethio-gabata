"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";


export const NavbarRoutes = () => {
  const pathname = usePathname();



  return (
    <>
      <div className="flex gap-x-2 ml-auto">
        <UserButton  />
      </div>
    </>
  );
};
