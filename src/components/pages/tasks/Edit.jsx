import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";
import { useLocation } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Field from "../../ui/Field";
import Dialog from "../../ui/Dialog";
import { indexOf } from "lodash";
export default function Edit() {
  const location = useLocation();
  const editTask = location?.state?.task;

  const { tasks, updateTasks } = useContext(TaskContext);
  const [task, setTask] = useState(
    editTask ? editTask : { name: "", fields: [], location: "" }
  );
  const [originalTask, setOriginalTask] = useState({});
  const [selection, setSelection] = useState(editTask ? editTask.id : "");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogState, setDialogState] = useState({
    changes: {},
    open: false,
  });

  useEffect(() => {
    console.log("Location", location);
    console.log("Edit Task", editTask);
    console.log("selection", selection);
  }, []);

  useEffect(() => {
    if (selection !== "") {
      let taskData = tasks.find((task) => task.id == selection);

      taskData = {
        ...taskData,
        location: taskData.location.slice(
          0,
          taskData.location.lastIndexOf("/")
        ),
      };

      console.log("taskData", taskData);

      setTask(taskData);
      setOriginalTask(taskData);
    }
  }, [selection]);

  const handleReset = () => {
    let taskData = tasks.find((task) => task.id == selection);

    taskData = {
      ...taskData,
      location: taskData.location.slice(0, taskData.location.lastIndexOf("/")),
    };

    setTask((prevTask) => ({ ...taskData }));

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

  const closeDialog = () => {
    setDialogState((prevState) => ({ ...prevState, open: false }));
    setIsLoading(false);
  };

  const findChanges = () => {
    const changes = {
      name: {},
      location: {},
      fields: [],
    };

    if (task.name !== originalTask.name) {
      changes["name"] = {
        old: originalTask.name,
        new: task.name,
      };
    }
    if (task.location !== originalTask.location) {
      changes["location"] = {
        old: originalTask.location,
        new: task.location,
      };
    }

    //
    //             },
    //           ];
    //         } else {
    //           changes["fiedls"] = [...changes["fields"]];
    //         }

    //         changes={
    //           ...changes,
    //           id: field.id,  {
    //           name: {
    //             id: field.id,
    //             old: originalField.name,
    //             new: field.name,
    //           },
    //         }
    //       };
    // }
    //       if (field.type !== originalField.type) {
    //         changes["fields"][field.id] = {
    //           type: {
    //             id: field.id,
    //             old: originalField.type,
    //             new: field.type,
    //           },
    //         };
    //       }
    //       if (field.required !== originalField.required) {
    //         changes["fields"] = {
    //           id: field.id,
    //           required: {
    //             old: originalField.required,
    //             new: field.required,
    //           },
    //         };
    //       }
    //     }
    //   });
    // });

    let addedFields = [];
    let deletedFields = [];
    let changedFields = [];

    task.fields.forEach((field) => {
      let found = false;

      originalTask.fields.forEach((originalField) => {
        if (field.id == originalField.id) {
          let changedFieldName = [];
          if (field.name !== originalField.name) {
            changedFieldName.push("name");
          }
          if (field.type !== originalField.type) {
            changedFieldName.push("type");
          }
          if (field.required !== originalField.required) {
            changedFieldName.push("required");
          }

          if (changedFieldName.length > 0) {
            let data = {
              id: field.id,
              originalValue: originalField,
              newValue: field,
            };
            data["field"] = changedFieldName;
            changedFields.push(data);
            found = true;
          }
        }
      });

      if (!found) {
        addedFields.push(field);
      }
    });

    console.log("addedFields", addedFields);
    console.log("deletedFields", deletedFields);
    console.log("changedFields", changedFields);
    console.log("changes", changes);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setDialogState((prevState) => ({
      ...prevState,
      changes: findChanges(),
      open: true,
    }));
  };
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Edit Task</h3>
      <Card className="xl:px-28 xl-py lg:text-lg">
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
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
              <Input
                value={task.name}
                onChange={(e) => {
                  setTask((prevTask) => ({
                    ...prevTask,
                    name: e.target.value,
                  }));
                }}
              />
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
              {task?.fields?.length == 0 && (
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
          <Dialog
            isOpen={dialogState.open}
            title="Update Task"
            size="lg"
            onClose={closeDialog}
          ></Dialog>
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
