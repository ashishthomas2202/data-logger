import React from "react";
import { motion } from "framer-motion";

export default function Page({
  children,
  className = "",
  isLoading = false,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLoading ? "hidden" : "visible"}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-full ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
