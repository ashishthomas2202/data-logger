import React from "react";
import { motion } from "framer-motion";

export default function Page({ children, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
