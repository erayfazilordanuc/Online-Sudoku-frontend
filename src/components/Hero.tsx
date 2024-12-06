"use client";

import Image from "next/image";

import { CustomButton } from "./";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero overflow-hidden mb-32">
      <div className="pt-16 padding-x">
        <h1 className="hero__title">
          Welcome to <span className="text-primary-blue">SudokuKe</span>
        </h1>
        <p className="mb-5l lg:ml-24 ml-1">
          You can either play on your own or with your friend as a competitor
        </p>
        <Image
          src="/table.png"
          alt="logo"
          width={450}
          height={450}
          className="object-contain lg:ml-28"
        />
      </div>
      <div className="pt-16 padding-x mr-44 mt-8 lg:mt-48">
        <h1 className="hero__title">Play</h1>
        <CustomButton
          title="Multiplayer"
          containerStyles="py-3 px-6 bg-primary-blue text-white rounded-full mt-3 hover:bg-primary-blue-hover"
          handleClick={() => {
            router.push("/online");
          }}
        />
        <CustomButton
          title="Singleplayer"
          containerStyles="py-3 px-6 bg-primary-blue text-white rounded-full mt-3 hover:bg-primary-blue-hover"
          handleClick={() => {
            router.push("/offline/game");
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
