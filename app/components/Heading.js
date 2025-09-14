"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Heading = ({ handleClick }) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
    toast.success("Logout successfully!");
  };
  return (
    <div className="block md:flex justify-between">
      <div className="w-full md:w-[100%] ">
        <p className="text-4xl font-bold">Kanban Board</p>
        <p className=" py-2 text-xs md:text-sm">
          Kanban Board is a simple todo application that lets users add tasks,
          assign them, and update their status using a drag-and-drop interface.
          With columns like Todo,
        </p>
      </div>
      <div className="flex gap-2">
        {token && <Button name={"Add Task"} handleClick={handleClick} />}
        {token && (
          <Button
            name={token ? "Logout" : "Login"}
            handleClick={token ? handleLogout : handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default Heading;
