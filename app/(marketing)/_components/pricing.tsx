import Image from "next/image";
import Check from "../../../public/check.svg";

export function Pricing() {
  return (
    <div className="py-[48px] lg:py-[60px]">
      <h1 className="text-[#172026] text-center font-medium  text-2xl lg:text-[42px]">
        Flexible plans for you
      </h1>
      <p className="pt-[16px] pb-[40px] text-center text-[#36485C] lg:text-[18px]">
        First Package
      </p>

      <div className="flex flex-col gap-y-6 gap-x-[24px] lg:flex-row">
        <div className="w-full rounded-[8px] bg-[#F5F4FF] p-6 flex flex-col lg:justify-between">
          <div>
            <h3 className="font-medium text-[#4328EB] text-[18px] lg:text-xl">
              Basic
            </h3>
            <p className="pt-[12px] text-[#36485C] lg:text-[18px]">
              Perfect for testing the waters
            </p>

            <h2 className="pt-4 text-2xl font-medium lg:text-[32px]">
              2000 Birr
            </h2>

            <ul className="flex flex-col gap-y-2 pt-4 text-[#5F7896]">
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                For freedom of time
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Phone Number:{" "}
                <span className="text-muted-foreground">0919042420</span>
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Bank Account:{" "}
                <span className="text-muted-foreground">1000***90765</span>
              </li>
            </ul>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Start Trial
          </button>
        </div>

        <div className="w-full rounded-[8px] bg-[#4328EB] p-6 flex flex-col">
          <div>
            <h3 className="font-medium text-white text-[18px] lg:text-xl">
              Golden package
            </h3>
            <p className="pt-[12px] text-[#F4F8FA] lg:text-[18px]">
              The best package.
            </p>

            <h2 className="pt-4 text-2xl font-medium text-white lg:text-[32px]">
              11,000
            </h2>

            <ul className="flex flex-col gap-y-2 pt-4 text-[#F4F8FA]">
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                For better tomorrow
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Phone Number: <span className="">0919042420</span>
              </li>
              <li className="flex items-center gap-x-2">
                <span>
                  <Image src={Check} alt="included" />
                </span>
                Bank Account: <span className="">1000***90765</span>
              </li>
            </ul>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Get Started
          </button>
        </div>

        <div className="w-full rounded-[8px] bg-[#F5F4FF] p-6 flex flex-col lg:justify-between">
          <div>
            <h3 className="font-medium text-[#4328EB] text-[18px] lg:text-xl">
              Diamond level
            </h3>
            <p className="pt-[12px] text-[#36485C] lg:text-[18px]">
              Perfect for big buissness
            </p>

            <h2 className="pt-4 text-2xl font-medium lg:text-[32px]">6000 Birr</h2>

            <p className="pt-4 text-[16px] text-[#36485C]">
              Freedom of money
            </p>
          </div>
          <button className="mt-[16px] rounded-[4px] bg-white py-[14px] text-[#4328EB] font-medium">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
