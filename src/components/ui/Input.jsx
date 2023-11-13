import React, { useRef } from "react";

export default function Input({
  type,
  value = "",
  onChange = () => {},
  onFocus = () => {},
  className = "",
  ...InputProps
}) {
  const inputClickedOnce = useRef(false);

  const handleFocus = (e) => {
    const input = e.target;

    setTimeout(() => {
      if (!inputClickedOnce.current) {
        const valueLength = input.value.length;
        input.setSelectionRange(valueLength, valueLength);

        inputClickedOnce.current = true;
      }
    }, 0);

    onFocus(e);
  };
  return (
    <input
      type={type ? type : "text"}
      value={value}
      onChange={onChange}
      // className={`w-full min-w-[100px] rounded-lg bg-gray-100 outline-3 outline-offset-2 focus:outline-gray-200 dark:focus:outline-gray-400 p-4 placeholder:text-gray-300 dark:text-gray-950 ${className}`}
      className={`w-full min-w-[100px] rounded-lg bg-white outline-2 focus:outline-gray-400 dark:focus:outline-gray-400 p-4 placeholder:text-gray-300 dark:text-gray-950 ${className}`}
      {...InputProps}
      onFocus={handleFocus}
    />
  );
}
