import React from "react";
import Loader from "./loader";

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  loading = false,
  ...props
}) {
  const variants = {
    primary:
      " bg-indigo-950 hover:bg-indigo-900 hover:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-900 dark:hover:border-gray-950 text-white",
    secondary: "bg-blue-300 hover:bg-blue-200 hover:border-blue-200 text-black",
    danger: "bg-red-500 hover:bg-red-400 hover:border-red-400 text-white",
    clear: "",
  };

  return (
    <button
      type="button"
      className={`${variants[variant]} font-semibold flex justify-center items-center gap-2.5 px-2.5 py-4 rounded-lg transition-all duration-200 ${className}`}
      onClick={onClick}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
