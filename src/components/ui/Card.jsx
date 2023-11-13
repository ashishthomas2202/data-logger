import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-slate-100 dark:bg-indigo-950 px-4 py-4 md:px-6 md:py-6 rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
