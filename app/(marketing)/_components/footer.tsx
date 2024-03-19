import Image from "next/image";
import Logo from "../../../public/ethio-gabata.jpg";
import Facebook from "../../../public/Facebook.svg";
import Twitter from "../../../public/X.svg";
import Feed from "../../../public/Feed.svg";

export function Footer() {
  return (
    <div className="pt-[80px] pb-[40px]">
      <div className="flex items-center justify-center gap-x-[12px]">
        <Image src={Logo} alt="Logo" className="w-20 h-20 rounded-md" />
        <p className="font-bold text-[#36485C] text-[17px]">
          Ethio <span className="text-emerald-500">Gabata</span>
        </p>
      </div>

      <p className="pt-[56px] text-center text-[14px] font-medium text-[#5F7896] sm:pt-5">
        © Copyright 2024. Your Site. All rights reserved.
      </p>

      <div className="flex items-center justify-center gap-x-[56px] pt-[40px]">
        <Image src={Facebook} alt="Facebook" />
        <Image src={Feed} alt="Feed" />
        <Image src={Twitter} alt="Twitter" />
      </div>
    </div>
  );
}
