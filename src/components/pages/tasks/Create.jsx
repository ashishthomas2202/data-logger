import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../../context/TaskContext";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Field from "../../ui/Field";
import Button from "../../ui/Button";

export default function CreateTask() {
  let navigate = useNavigate();
  const { tasks, updateTasks } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [fields, setFields] = useState([]);
  const [location, setLocation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const createTask = (task) => {
    window.api
      .send("create-task", task)
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          // setTasks((prevTasks) => [...prevTasks, data.task]);
          updateTasks();
          navigate("/tasks");
          alert("Task Created Successfully!");
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (fields.length == 0) {
      alert("Please add at least one field");
      setIsLoading(false);
    } else if (location.length == 0) {
      alert("Please choose a location to save the task data");
      setIsLoading(false);
    } else {
      let data = {
        name: taskName,
        fields: fields,
        location: location,
      };

      createTask(data);
    }
  };

  const handleChooseLocation = () => {
    window.api
      .send("choose-location")
      .then((data) => {
        if (data.status === "success") {
          setLocation(data.path);
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
      <h3 className="text-2xl font-bold mb-5">Create Task</h3>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <div className="flex flex-col items-start w-full mb-3 ">
            <label className="text-lg font-semibold" htmlFor="taskname">
              Task Name:{" "}
            </label>
            <Input
              className="w-full"
              type="text"
              name="taskname"
              id="taskname"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 outline outline-2 outline-white rounded-lg">
            <div className="w-full">
              <p className={location.length == 0 ? "" : "self-start"}>
                Choose a folder location to save the task data
              </p>
              <p className="text-ellipsis overflow-hidden text-xs text-pink-300">
                {location}
              </p>
            </div>
            <Button
              className="w-full max-w-[300px] sm:w-1/2"
              onClick={handleChooseLocation}
            >
              Choose
            </Button>
          </div>

          <div className="flex flex-col items-start w-full ">
            <h2 className="text-lg font-semibold">Fields</h2>
          </div>

          {fields.map((field, index) => {
            return (
              <Field
                key={"create-" + field.id}
                id={field.id}
                field={field}
                handleChange={(newData) =>
                  setFields((prevFields) =>
                    prevFields.map((prevField) =>
                      prevField.id == field.id ? newData : prevField
                    )
                  )
                }
                handleRemove={() =>
                  setFields((prevFields) =>
                    prevFields.filter((prevField) => prevField.id !== field.id)
                  )
                }
                onChange={() => {}}
              />
            );
          })}

          <Button
            className="w-full md:w-1/2 self-center"
            variant="secondary"
            onClick={() => {
              setFields((prevFields) => [
                ...prevFields,
                {
                  id: `${new Date().getTime()}`,
                  name: "",
                  type: "",
                  required: false,
                },
              ]);
            }}
          >
            Add Fields
          </Button>
          <Button
            className="w-full md:w-1/2 self-center"
            type="submit"
            loading={isLoading}
          >
            Create Task
          </Button>
        </form>
      </Card>
    </Page>
  );
}
