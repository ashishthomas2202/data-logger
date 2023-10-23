import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../ui/loader";

export default function Initialize() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     ipcRenderer.invoke("get-tasks").then((tasks) => {
  //       console.log("invoke:get-tasks", tasks);
  //     });
  //   }, []);

  const getTasks = async () => {
    await window.api.invoke("get-tasks").then((tasks) => {
      console.log("invoke:get-tasks", tasks);
      setTasks(tasks);

      setLoading(false);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Loader state={loading} />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ delay: 1 }}
          >
            This is Initialize page
            <Link to="/">Home</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
