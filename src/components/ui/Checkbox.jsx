import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({
  id,
  className = "",
  value = false,
  onChange,
}) {
  return (
    <div
      className={`w-7 h-7 rounded-md border-2 border-red-500 flex justify-center items-center dark:bg-red-500 ${className}`}
      onClick={() => {
        onChange();
      }}
    >
      <span
        className={"text-red-500 dark:text-white"}
        style={{ visibility: value ? "visible" : "hidden" }}
      >
        <FaCheck />
      </span>

      <input
        id={id}
        name={id}
        type="checkbox"
        value={value}
        onChange={onChange}
        hidden
      />
    </div>
  );
}
