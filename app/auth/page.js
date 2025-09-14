import React from "react";
import AuthForm from "../components/AuthForm";
import Heading from "../components/Heading";

const Page = () => {
  return (
    <div className="block md:flex justify-center w-full h-[100vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
        <div className="p-5 md:py-34 md:px-20">
          <Heading />
        </div>
        <div className=" flex justify-center bg-[#F3F4F6] md:py-34">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
