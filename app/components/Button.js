"use client"
import React from "react";

const Button = ({ name, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="bg-[#F3F4F6] w-full h-fit px-5 py-3 rounded-md cursor-pointer"
    >
      <p className="text-center text-sm whitespace-nowrap">{name}</p>
    </div>
  );
};

export default Button;
