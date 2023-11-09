import React from "react";

export default function Input({
  type,
  value = "",
  onChange = () => {},
  className = "",
  ...InputProps
}) {
  return (
    <input
      type={type ? type : "text"}
      value={value}
      onChange={onChange}
      className={`w-full min-w-[100px] rounded-lg bg-gray-100 outline-3 outline-offset-2 focus:outline-gray-200 dark:focus:outline-gray-400 p-4 placeholder:text-gray-300 dark:text-gray-950 ${className}`}
      {...InputProps}
    />
  );
}
