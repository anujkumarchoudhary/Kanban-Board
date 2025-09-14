"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { createTask, updateTask } from "../redux/slice/tasksSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TaskFrom = ({ refresh, handleClose }) => {
  const [inputVal, setInputVal] = useState({
    task: "",
    status: "todo",
  });
  const dispatch = useDispatch();
  const taskId = "";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleAdd = async () => {
    if (!inputVal.task) {
      return toast.error("Please enter task!");
    }
    if (taskId) {
      const res = await dispatch(updateTask(inputVal));
      if (res?.payload?.status === 404) {
        toast.error(res?.payload?.message);
      } else if (res?.payload?.status === 401) {
        toast.error(res?.payload?.message);
      } else {
        toast.success(res?.payload?.message);
      }
    } else {
      const res = await dispatch(createTask(inputVal));
      if (res?.payload?.status === 201) {
        toast.success(res?.payload?.message);
        handleClose();
        refresh();
      } else {
        toast.error(res?.payload?.message);
      }

      dispatch(setGlobalData(res?.payload?.token));
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res?.payload?.token);
      }
    }
    await handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-10">
      <div className="relative bg-white space-y-4 p-10 rounded-lg shadow-lg w-[90%] md:w-1/2 max-w-md text-center">
        <p className="text-lg font-bold mb-5">Add Task</p>
        <IoClose
          onClick={handleClose}
          size={22}
          className="absolute top-2 right-2 cursor-pointer hover:text-red-400"
        />
        <InputField
          type={"text"}
          name={"task"}
          value={inputVal.task}
          handleChange={handleChange}
          placeholder={"Please enter task"}
        />
        <div className="flex justify-between gap-2">
          <Button name={"Cancel"} handleClick={handleClose} />
          <Button name={"Add"} handleClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default TaskFrom;
