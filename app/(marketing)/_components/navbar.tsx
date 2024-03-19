import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { User } from "lucide-react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LoginButton } from "@/components/auth/login-button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-container px-6 lg:px-20 3xl:px-0 relative z-30 py-5">
      <Logo />

      {/* <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="text-[16px] font-[400] text-neutral-500 flex items-center justify-center cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul> */}

      <div className="flex lg:items-center lg:justify-center ">
        <LoginButton>
          <Button>
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </LoginButton>
      </div>
    </nav>
  );
};

export default Navbar;
