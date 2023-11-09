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
      className={`rounded-lg bg-gray-100 focus:outline-gray-200 p-4 placeholder:text-gray-300 dark:text-gray-950 ${className}`}
      {...InputProps}
    />
  );
}
