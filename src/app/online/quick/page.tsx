"use client";

import { CustomButton } from "@src/components";
import { authenticationService } from "@src/services/authenticationService";
import { Input } from "@nextui-org/input";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socketio } from "@src/services/socketioService";

export default function Quick() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const router = useRouter();

  const login = async () => {
    try {
      if (checkFields()) {
        toast.success("Joining the room");

        socketio.emit("join_room", room);

        socketio.on("test_message", (data) => {
          if (data === "test_message") {
            setTimeout(() => {
              router.push(`/online/quick/game/${room}/${username}`);
            }, 1250);
          }
        });
      }
    } catch (error) {
      if (isErrorHasStatus(error)) {
        popError(error.status);
      }
    }
  };

  function isErrorHasStatus(error: unknown): error is { status: number } {
    return (error as { status: number }).status !== undefined;
  }

  const checkFields = () => {
    if (username === "" || room === "") {
      toast.error("Please fill in all the fields");
      return false;
    }

    return true;
  };

  const popError = (code: number) => {
    if (code === 403) {
      toast.error("Username or password is invalid");
    } else if (code === 500) {
      toast.error("This username already taken");
    } else {
      toast.error("Server error");
    }
  };

  return (
    <div className="py-20 flex justify-center bg">
      <ToastContainer
        position="top-right"
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
      <div className="w-64">
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          Quick Game
        </h1>
        <Input
          className="mb-2"
          type="username"
          label="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          className="mb-2"
          type="number"
          min="0"
          label="Room"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <div className="flex justify-center">
          <CustomButton
            title="Join"
            containerStyles="py-3 px-6 bg-primary-blue text-white rounded-full mb-60 mt-2 hover:bg-primary-blue-hover"
            handleClick={login}
          />
        </div>
      </div>
    </div>
  );
}
