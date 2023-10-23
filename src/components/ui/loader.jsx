import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./loader.css";
export default function Loader({ state }) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="loader"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
