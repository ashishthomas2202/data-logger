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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleReset = () => {
    setTask((prevTask) => ({
      ...tasks.filter((task) => task.id == prevTask.id)[0],
    }));
    alert("Reset changes successful!");
  };
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
      <Card className="xl:px-28 xl-py lg:text-lg">
        <form className="flex flex-col justify-center">
          {" "}
          <fieldset className="flex flex-col justify-between items-center md:flex-row md:items-start gap-3">
            <div className="w-full">
              <label className="font-semibold">
                Select a task for editting:
              </label>
              <Select
                value={selection}
                onChange={(value) => setSelection(value)}
              >
                <option hidden>Choose a task...</option>
                {tasks.map((task) => (
                  <option key={`option-${task.id}`} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              className="w-full md:w-60 md:mt-6 py-4.5 lg:mt-7"
              onClick={handleReset}
            >
              Reset Changes
            </Button>
          </fieldset>
          <fieldset
            className={`w-full self-center transition ease-in-out duration-700 ${
              selection == ""
                ? "max-h-0 overflow-hidden opacity-0 "
                : "max-h-full opacity-100 border-2 px-3 py-4 xl:px-28 xl:py-10 rounded-lg mt-3 flex flex-col gap-3"
            } `}
          >
            <div className="w-full">
              <label className="font-semibold">Task Name:</label>
              <Input value={task.name} />
            </div>

            <div className="w-full">
              <label className="font-semibold">Task Location:</label>
              <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-900 rounded-lg px-2 py-2 gap-3 overflow-hidden">
                <p
                  className="w-[50vw] md:w-full truncate text-pink-300 text-sm lg:text-lg"
                  title={task.location}
                >
                  {task.location}
                </p>
                <Button
                  className="w-full md:w-6/12"
                  onClick={handleChooseLocation}
                >
                  Choose Location
                </Button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <p className="font-semibold mb-4">Fields:</p>
              {task.fields.length == 0 && (
                <p className="text-center mb-5">No Fields Exist</p>
              )}
              {task.fields.map((field, i) => (
                <Field
                  key={`edit-${field.id}`}
                  id={field.id}
                  field={field}
                  handleChange={(newData) =>
                    setTask((prevTask) => ({
                      ...prevTask,
                      fields: prevTask.fields.map((prevField) =>
                        prevField.id == field.id ? newData : prevField
                      ),
                    }))
                  }
                  handleRemove={() => {
                    setTask((prevTask) => ({
                      ...prevTask,
                      fields: [
                        ...prevTask.fields.filter(
                          (prevField) => prevField.id !== field.id
                        ),
                      ],
                    }));
                  }}
                />
              ))}
            </div>
            <Button
              className="w-full md:w-1/2 self-center"
              variant="secondary"
              onClick={() => {
                setTask((prevTask) => ({
                  ...prevTask,
                  fields: [
                    ...prevTask.fields,
                    {
                      id: `${new Date().getTime()}`,
                      name: "",
                      type: "",
                      required: false,
                    },
                  ],
                }));
              }}
            >
              Add Fields
            </Button>
          </fieldset>
          <Button
            className={`w-full md:w-1/2 mt-6 self-center ${
              selection == "" ? "opacity-0 hidden" : "opacity-100 block"
            }`}
            type="submit"
            loading={isLoading}
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </Page>
  );
}
