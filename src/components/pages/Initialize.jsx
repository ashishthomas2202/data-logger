import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../ui/loader";

export default function Initialize() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    await window.api.invoke("get-tasks").then((tasks) => {
      console.log("invoke:get-tasks", tasks);
      setTasks(tasks);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <Link to="/">Home</Link>
    </motion.div>
  );
}
