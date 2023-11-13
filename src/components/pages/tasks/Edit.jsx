import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";
import { useLocation } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
export default function Edit() {
  const location = useLocation();
  const editTask = location?.state?.task;

  const { tasks, updateTasks } = useContext(TaskContext);
  const [task, setTask] = useState(
    editTask ? editTask : { name: "", fields: [], location: "" }
  );
  const [selection, setSelection] = useState(editTask ? editTask.id : "");

  useEffect(() => {
    console.log("Location", location);
    console.log("Edit Task", editTask);
    console.log("selection", selection);
  }, []);

  useEffect(() => {
    if (selection !== "") {
      let taskData = tasks.find((task) => task.id == selection);
      setTask(taskData);
    }
  }, [selection]);

  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Edit Task</h3>
      <Card>
        <fieldset>
          <div>
            <label className="font-semibold">Select a task for editting:</label>
            <Select value={selection} onChange={(value) => setSelection(value)}>
              <option hidden>Choose a task...</option>
              {tasks.map((task) => (
                <option key={`option-${task.id}`} value={task.id}>
                  {task.name}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>

        <div
          className={`transition ease-in-out duration-700 ${
            selection == ""
              ? "max-h-0 overflow-hidden opacity-0 "
              : "max-h-[100vh] opacity-100 border-2 px-3 py-4 rounded-lg mt-3"
          } `}
        >
          <div>
            <label className="font-semibold">Task Name:</label>
            <Input value={task.name} />
          </div>
        </div>
      </Card>
    </Page>
  );
}
