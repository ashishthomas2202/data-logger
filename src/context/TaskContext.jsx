import React, { useState, useEffect, createContext } from "react";

export const TaskContext = createContext({
  tasks: [],
  setTasks: () => {},
});

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const contextValue = {
    tasks,
    setTasks,
  };

  function getTasks() {
    window.api
      .send("get-all-tasks")
      .then((data) => {
        if (data.status === "success") {
          setTasks(data.tasks);
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
