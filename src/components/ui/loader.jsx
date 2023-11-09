import React from "react";
import { motion } from "framer-motion";

import "./loader.css";
export default function Loader() {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "Spring", delay: 0.2 }}
      className="loader border-[3px] border-color-gray-200 dark:border-color-white"
    ></motion.span>
  );
}
