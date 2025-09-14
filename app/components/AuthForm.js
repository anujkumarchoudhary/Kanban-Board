"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import InputField from "./InputField";
import Button from "./Button";
import { loginUser, signupUser } from "../redux/slice/usersSlice";
import { setGlobalData } from "../redux/slice/globalSlice";
import { useRouter } from "next/navigation";

const AuthForm = ({ handleClose, isRegister }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
    tac: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleClick = async () => {
    if (isLogin) {
      if (
        !inputVal.name ||
        !inputVal.email ||
        !inputVal.phone ||
        !inputVal.password
      ) {
        return toast.error("Please fill required field!");
      }
      const res = await dispatch(signupUser(inputVal));
      if (res?.payload?.status === 201) {
        toast.success(res?.payload?.message);
      } else {
        toast.error(res?.payload?.message);
      }
    } else {
      if (!inputVal.email || !inputVal.password) {
        return toast.error("Please fill email and password!");
      }
      const res = await dispatch(
        loginUser({ email: inputVal.email, password: inputVal.password })
      );
      if (res?.payload?.status === 404) {
        toast.error(res?.payload?.message);
      } else if (res?.payload?.status === 401) {
        toast.error(res?.payload?.message);
      } else {
        toast.success(res?.payload?.message);
        router.push("/");
      }

      dispatch(setGlobalData(res?.payload?.token));
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res?.payload?.token);
      }
    }
    await handleClose();
  };

  return (
    <div>
      <div className="w-[25rem] md:w-[30rem] relative bg-white space-y-4 p-10 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-bold">{!isLogin ? "Login" : "Sign Up"}</p>

        {isLogin && (
          <InputField
            label="Name"
            name={"name"}
            value={inputVal.name}
            handleChange={handleChange}
            placeholder={"Name"}
            required={true}
          />
        )}

        <InputField
          label="Email"
          name={"email"}
          value={inputVal.email}
          handleChange={handleChange}
          placeholder={"Email"}
          required={true}
        />
        {isLogin && (
          <InputField
            label="Phone"
            type={"tel"}
            name={"phone"}
            value={inputVal.phone}
            handleChange={handleChange}
            placeholder={"Phone"}
            maxLength={10}
            required={true}
          />
        )}
        <InputField
          label="Password"
          type={"password"}
          name={"password"}
          value={inputVal.password}
          handleChange={handleChange}
          placeholder={"Password"}
          required={true}
        />
        <div className="flex gap-2 mt-2">
          <InputField
            name={"name"}
            value={inputVal.name}
            handleChange={handleChange}
            type={"checkbox"}
            className={"!w-4 my-auto"}
          />
          {isLogin ? (
            <p className="text-xs my-auto">Accept Terms & Condition</p>
          ) : (
            <div className="flex justify-between w-full">
              <p className="">Remember</p>
              {/* <p className="">Forgot Password</p> */}
            </div>
          )}
        </div>
        <Button
          handleClick={handleClick}
          name={isLogin ? "Register" : "Login"}
          isBorder={true}
          className={"w-full"}
        />
        <p onClick={() => setIsLogin(!isLogin)} className="text-xs">
          {!isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
