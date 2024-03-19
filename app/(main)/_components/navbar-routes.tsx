"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import LogoImage from "../../../public/ethio-gabata.jpg"
import Image from "next/image";


export const NavbarRoutes = () => {
  const pathname = usePathname();



  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col items-center justify-center" >
        <Image  src={LogoImage} alt="" className="rounded-full w-[50px] h-[50px]" />
         <p className="text-muted-foreground" >Unity To Success</p>
        </div>
        <UserButton  />
      </div>
    </>
  );
};
