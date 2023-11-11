import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import Button from "./Button";

export default function Dialog({
  children,
  isOpen = false,
  onClose = () => {},
  className = "",
  size = "sm",
  title = "",
}) {
  const sizes = {
    sm: "w-[20vw]",
    md: "w-[40vw]",
    lg: "w-[60vw]",
    xl: "w-[80vw]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isOpen ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, transitionEnd: { display: "none" } },
        visible: { opacity: 1, display: "flex" },
      }}
      transition={{ duration: 0.5, type: "tween" }}
      className="fixed top-0 left-0 h-screen w-screen justify-center items-center backdrop-blur-lg bg-gray-950  bg-opacity-50 dark:bg-gray-600  dark:bg-opacity-50   z-50"
      onClick={onClose}
    >
      <div
        className={` ${sizes[size]} min-w-[300px] max-w-[1000px] bg-gray-950 px-5 py-2 rounded-lg ${className}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="flex justify-between items-center pb-2  border-slate-300 dark border-gray-900 border-b-2">
          <h3 className="font-bold">{title}</h3>
          <Button
            variant="clear"
            onClick={onClose}
            className="text-lg font-bold text-gray-950 hover:text-gray-900 dark:text-white dark:hover:text-gray-700 duration-100 py-0 px-0"
          >
            <BsXLg />
          </Button>
        </header>
        <main className="py-4">{children}</main>
      </div>
    </motion.div>
  );
}
