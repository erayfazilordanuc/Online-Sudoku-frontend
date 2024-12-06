"use client";

import { CustomButton } from "@src/components";
import { authenticationService } from "@src/services/authenticationService";
import { Input } from "@nextui-org/input";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({ params }: { params: { user: string } }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isUsernameLogin, setIsUsernameLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  // For now, only username, email and password send to backend; others are for show

  const router = useRouter();

  const popError = (code: number) => {
    if (code === 403) {
      toast.error("Username or password is invalid");
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
      <div className="w-80">
        <h1 className="flex justify-center">
          This is profile of {params.user}
        </h1>
        <h1 className="flex justify-center">Profile data will be here soon</h1>
      </div>
    </div>
  );
}
