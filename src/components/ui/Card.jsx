import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-slate-100 dark:bg-indigo-950 p-6 rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
