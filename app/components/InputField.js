import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  handleChange,
  required,
}) => {
  return (
    <div className="">
      <p className="text-left">
        {label} {required && <span className="text-red-400">*</span>}
      </p>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={type === "tel" && 10}
        className="outline-none w-full border-2 border-[#F3F4F6] rounded-sm px-4 py-1.5"
      />
    </div>
  );
};

export default InputField;
