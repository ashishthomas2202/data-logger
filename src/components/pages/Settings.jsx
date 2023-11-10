import React, { useContext } from "react";
import { motion } from "framer-motion";
import { TaskContext } from "../../context/TaskContext";
import Page from "../ui/Page";
import Card from "../ui/Card";
import Button from "../ui/Button";
export default function Settings() {
  const { tasks, setTasks } = useContext(TaskContext);
  const handleDelete = () => {
    window.api
      .send("reset")
      .then((data) => {
        if (data.status === "success") {
          setTasks([]);
          alert("App reset successfully!");
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Settings</h3>
      <Card>
        <Button onClick={handleDelete}>Reset</Button>
      </Card>
    </Page>
  );
}
