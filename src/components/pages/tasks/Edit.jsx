import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";
import { useLocation } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Field from "../../ui/Field";
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

  const handleChooseLocation = () => {
    window.api
      .send("choose-location")
      .then((data) => {
        if (data.status === "success") {
          setTask((prevTask) => ({ ...prevTask, location: data.path }));
        } else if (data.status === "canceled") {
          return;
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

        <fieldset
          className={`transition ease-in-out duration-700 ${
            selection == ""
              ? "max-h-0 overflow-hidden opacity-0 "
              : "max-h-[100vh] opacity-100 border-2 px-3 py-4 rounded-lg mt-3 flex flex-col gap-3"
          } `}
        >
          <div>
            <label className="font-semibold">Task Name:</label>
            <Input value={task.name} />
          </div>

          <div>
            <label className="font-semibold">Task Location:</label>
            {/* <Input value={task.location} /> */}
            <div className="flex justify-between items-center bg-indigo-900 rounded-lg px-2 py-2">
              <p className="text-pink-300 text-sm">{task.location}</p>
              <Button onClick={handleChooseLocation}>Choose Location</Button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-4">Fields:</p>
            {task.fields.map((field, i) => (
              <Field
                key={`field-${field.id}`}
                field={field}
                handleChange={(newData) =>
                  setTask((prevTask) => ({
                    ...prevTask,
                    fields: prevTask.fields.map((prevField) =>
                      prevField.id == field.id ? newData : prevField
                    ),
                  }))
                }
              />
            ))}
          </div>
        </fieldset>
      </Card>
    </Page>
  );
}
