import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { BsFileEarmarkText } from "react-icons/bs";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    window.api
      .send("get-all-tasks")
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setTasks(data.tasks);
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }, []);

  return (
    <Page>
      <h3 className="text-2xl font-bold mb-5">Tasks Page</h3>
      {tasks.length == 0 && (
        <Card
          className={
            "h-5/6 min-h-[200px] max-h-96 flex justify-center items-center"
          }
        >
          <div className="flex flex-col p-6 justify-center items-center">
            <BsFileEarmarkText className="text-8xl mb-2" />
            <h3 className="font-bold text-xl">No Task Found</h3>
            <p className="font-light text-xs">
              <Link to="/tasks/create">Create a new task.</Link>
            </p>
          </div>
        </Card>
      )}
      {tasks.map((task) => (
        <Card>{task.name}</Card>
      ))}
    </Page>
  );
}
