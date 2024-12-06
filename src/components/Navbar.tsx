"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CustomButton from "./CustomButton";

export default function NavBar() {
  const router = useRouter();

  return (
    <header className="w-full fixed z-10 bg-slate-300">
      <nav className="max-w-[1440px] mx-auto flex items-center sm:px-16 px-6 py-2 bg-transparent">
        <div className="flex-1 flex justify-start space-x-2 my-1">
          <Link href="/" className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-primary-blue">SudokuKe</h1>
            {/* <Image
              src="/logo.svg"
              alt="logo"
              width={118}
              height={18}
              className="object-contain"
            /> */}
          </Link>
        </div>

        {/* <div className="flex justify-end space-x-2">
          <CustomButton
            title="Login"
            btnType="button"
            containerStyles="py-3 px-6 text-primary-blue rounded-full bg-white min-w-[75px] hover:bg-slate-200"
            handleClick={() => {
              router.push("/login");
            }}
          />

          <CustomButton
            title="Home"
            btnType="button"
            containerStyles="py-3 px-6 text-primary-blue rounded-full bg-white min-w-[75px] hover:bg-slate-200"
            handleClick={() => {
              router.push("/");
            }}
          />
        </div> */}
      </nav>
    </header>
  );
}
