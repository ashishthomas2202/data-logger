import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../../context/TaskContext";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { BsFileEarmarkText } from "react-icons/bs";
// import { TimeAgo } from "../../../utils/date";
import TimeAgo from "../../ui/TimeAgo";

export default function Tasks() {
  // const { tasks, setTasks } = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

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
    console.log(tasks);
  }, [tasks]);

  return (
    <Page isLoading={tasks === undefined}>
      <h3 className="text-2xl font-bold mb-5">Tasks Page</h3>
      {tasks && tasks.length == 0 && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasks &&
          tasks.map((task) => {
            console.log(task);
            return (
              <Card key={task.id} className="flex flex-col gap-3">
                <div>
                  <p className="text-lg font-bold">{task.name}</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className=" text-8xl">{task.totalRecords}</span>
                  <span className="text-sm font-bold">Records</span>
                </div>
                <div>
                  <p className="text-sm">Total Fields: {task.totalFields}</p>
                  <p className="text-sm">
                    Updated: <TimeAgo timestamp={task.updatedAt} shortHand />{" "}
                  </p>
                  <p className="text-sm">
                    Created: <TimeAgo timestamp={task.createdAt} shortHand />{" "}
                  </p>
                </div>
              </Card>
            );
          })}
      </div>
    </Page>
  );
}
