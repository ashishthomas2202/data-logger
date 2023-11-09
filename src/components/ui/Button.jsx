import React from "react";

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary: "bg-gray-950 hover:bg-gray-900 hover:border-gray-900 text-white",
    secondary: "",
    danger: "bg-red-500 hover:bg-red-400 hover:border-red-400 text-white",
  };

  return (
    <button
      type="button"
      className={`${variants[variant]} flex justify-center items-center gap-2.5 px-2.5 py-4 rounded-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
