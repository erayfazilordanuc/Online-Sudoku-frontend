"use client";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomButton } from "@src/components";
import { useState } from "react";
import { gameService } from "@src/services/gameService";
import Game from "@src/components/Game";
import { BoardDTO } from "@src/types";
import { Input } from "@nextui-org/input";
import { Row } from "reactstrap";
import { input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Burada login ya da quick game seçeneği olacak
export default function Online() {
  const router = useRouter();

  return (
    <div className="pt-16 flex justify-center bg mb-80">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        theme="light"
        pauseOnFocusLoss
        draggable
        transition={Slide}
        pauseOnHover
      />
      <div>
        <h1 className="my-2 mb-4 flex justify-center text-3xl font-bold">
          Online
        </h1>
        <div className="flex justify-center">
          <CustomButton
            title="Login"
            containerStyles="mb-2 py-3 px-6 bg-primary-blue text-white rounded-full hover:bg-primary-blue-hover"
            handleClick={() => {
              router.push("/online/login");
            }}
          />
        </div>
        <div className="flex justify-center">
          <CustomButton
            title="Quick Game"
            containerStyles="mb-2 py-3 px-6 bg-primary-blue text-white rounded-full hover:bg-primary-blue-hover"
            handleClick={() => {
              router.push("/online/quick");
            }}
          />
        </div>
      </div>
    </div>
  );
}
