import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";



export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        {/* <Image src="/logo.svg" alt="logo" height={30} width={30} /> */}
        <p
          className={cn("text-lg text-neutral-700 pb-1 font-bold")}
        >
          Ethio <span className="text-green-500" >Gabata</span>
        </p>
      </div>
    </Link>
  );
};
