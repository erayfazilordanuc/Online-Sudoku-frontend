"use client";

import { CustomButton } from "@src/components";
import { authenticationService } from "@src/services/authenticationService";
import { Input } from "@nextui-org/input";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
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

  const login = async () => {
    try {
      if (checkFields()) {
        var response;
        if (isLogin) {
          response = await authenticationService.login(
            username,
            email,
            password
          );
        } else {
          response = await authenticationService.register(
            username,
            email,
            password
          );
        }

        if (response.status === 200) {
          toast.success(
            (isLogin ? "Login successful" : "Registration successful") +
              ", redirecting"
          );

          setTimeout(() => {
            router.push("login/profile/" + username);
          }, 1250);
        }
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
    if (password === "") {
      toast.error("Please fill in all the fields");
      return false;
    }

    if (isLogin) {
      if (isUsernameLogin) {
        if (username === "") {
          toast.error("Please fill in all the fields");
          return false;
        }
      } else if (email === "") {
        toast.error("Please fill in all the fields");
        return false;
      }
    } else {
      if (username === "" || email === "") {
        // Other fields will be checked here
        toast.error("Please fill in all the fields");
        return false;
      }
    }

    return true;
  };

  const popError = (code: number) => {
    if (code === 403) {
      toast.error("Username or password is invalid");
    }
  };

  return (
    <div className="py-16 flex justify-center bg">
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
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h1>
        {(isUsernameLogin || !isLogin) && (
          <div className="flex items-center mb-4">
            <Input
              className="flex-grow"
              type="username"
              label="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            {isLogin && (
              <CustomButton
                title={`${isUsernameLogin ? "Email" : "Username"}`}
                containerStyles="py-3 px-6 ml-2 bg-slate-500 text-white rounded-full hover:bg-slate-400"
                handleClick={() => {
                  setIsUsernameLogin(!isUsernameLogin);
                }}
              />
            )}
          </div>
        )}
        {!isLogin && (
          <Input
            className="mb-4"
            type="name"
            label="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        )}
        {!isLogin && (
          <Input
            className="mb-4"
            type="surname"
            label="Surname"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
        )}
        {(!isUsernameLogin || !isLogin) && (
          <div className="flex items-center mb-4">
            <Input
              className=""
              type="email"
              label="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!isUsernameLogin && (
              <CustomButton
                title={`${isUsernameLogin ? "Email" : "Username"}`}
                containerStyles="py-3 px-6 ml-2 bg-slate-500 text-white rounded-full hover:bg-slate-400"
                handleClick={() => {
                  setIsUsernameLogin(!isUsernameLogin);
                }}
              />
            )}
          </div>
        )}
        {!isLogin && (
          <Input
            className="mb-4"
            type="phone"
            label="Phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        )}
        <Input
          type="password"
          label="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="flex justify-center">
          <CustomButton
            title={`${isLogin ? "Login" : "Register"}`}
            containerStyles="py-3 px-6 bg-primary-blue text-white rounded-full mt-4 hover:bg-primary-blue-hover"
            handleClick={login}
          />
        </div>
        <p className="flex justify-center mt-3">
          {isLogin
            ? "If you don't have an account"
            : "If you already have an account"}
        </p>
        <div className="flex justify-center">
          <CustomButton
            title={`${isLogin ? "Register" : "Login"}`}
            containerStyles="py-3 px-6 bg-secondary-orange text-white rounded-full  mt-2 hover:bg-secondary-orange-hover"
            handleClick={() => {
              setIsLogin(!isLogin);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
        <p className="flex justify-center">or</p>
        <div className="flex justify-center">
          <CustomButton
            title="Login as guest"
            containerStyles="py-3 px-6 bg-slate-500 text-white rounded-full mb-16 mt-1 hover:bg-slate-400"
            handleClick={() => {
              router.push("login/guest");
            }}
          />
        </div>
      </div>
    </div>
  );
}
