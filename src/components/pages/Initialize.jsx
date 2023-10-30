import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Initialize() {
  const handleSelectDirectory = async () => {
    if (typeof window !== "undefined") {
      try {
        const path = await window.electronAPI.selectDirectory();
        // console.log(path); // Use the selected directory path
      } catch (error) {
        console.error("Failed to select directory", error);
      }
    }
  };

  const updateDirectory = async (url) => {
    try {
      const response = await axios.post(
        "https://localhost:5174/api/tasks",
        url
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to update directory", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      This is Initialize page <Link to="/">Home</Link>
      <button onClick={handleSelectDirectory}>Select Directory</button>
    </motion.div>
  );
}
