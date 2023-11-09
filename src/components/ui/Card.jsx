import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
