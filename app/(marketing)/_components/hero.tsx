import Image from "next/image";
// import Button from "./button";
import HeroImage from "../../../public/ethio-gabata.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroText =
  "Ethio Gebeta isn't just another business partner; we're an extension of your team. We understand the unique needs of Ethiopian customers and go above and beyond to ensure their satisfaction. With our exceptional customer service and unwavering commitment to excellence, Ethio Gebeta is the clear choice for your business needs.";

const Hero = () => {
  return (
    <section className="max-container px-6 lg:px-20 3xl:px-0 flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="absolute right-0 top-0 h-screen w-screen bg-pattern-2 bg-cover bg-center md:-right-28 xl:-top-60" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        {/* <Image
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="text-[52px] font-[700] leading-[120%] lg:text-[88px] lg:font-[700] lg:leading-[120%]">
          Welcome to Ethio <span className="text-green-500">ገበታ</span>
        </h1>
        <p className="text-[16px] font-[400] leading-[120%] mt-6 text-gray-30 xl:max-w-[520px]">
          {heroText}
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>

          <p className="text-[16px] font-[700] lg:text-[20px] lg:font-[700] text-blue-70">
            5
            <span className="text-[16px] font-[400] lg:text-[20px] lg:font-[400] ml-1">
              Star Performance
            </span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          {/* <Button type="button" title="Download App" variant="btn_green" />
          <Button
            type="button"
            title="How we work?"
            icon="/play.svg"
            variant="btn_white_text"
          /> */}
          <Link href={"/auth/register"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        {/* <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-[400] text-gray-20">Location</p>
              <Image src="/hero-image.jpg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">Aguas Calientes</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[16px] font-[400] block text-gray-20">
                Distance
              </p>
              <p className="text-[20px] font-[700] text-gray-500">173.28 mi</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[16px] font-[400] block text-gray-20">
                Elevation
              </p>
              <p className="text-[20px] font-[700] text-gray-400">2.040 km</p>
            </div>
          </div>
        </div> */}
        <Image src={HeroImage} alt="" className="rounded-md" />
      </div>
    </section>
  );
};

export default Hero;
