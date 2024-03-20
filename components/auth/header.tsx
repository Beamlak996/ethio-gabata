import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoImage from "../../public/icon.jpg"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Image src={LogoImage} className="w-20 h-20 rounded-lg bg-transparent" alt="" />
      <h1 className={cn("text-2xl font-semibold", font.className)}>
        Ethio <span className="text-green-500">ገበታ</span>
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
