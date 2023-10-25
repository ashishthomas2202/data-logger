import React from "react";
import { motion } from "framer-motion";

import "./loader.css";
export default function Loader() {
  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, type: "Spring" }}
      className="loader"
    ></motion.span>
  );
}
