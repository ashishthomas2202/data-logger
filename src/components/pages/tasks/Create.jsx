import React, { useState, useEffect } from "react";
import _ from "lodash";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [fields, setFields] = useState([
    { id: "54", name: "Name", type: "text", required: true },
    { id: "20", name: "Documents", type: "files", required: false },
  ]);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.length == 0) {
      alert("Please add at least one field");
    } else {
      let data = {
        task: taskName,
        fields: fields,
      };
      console.log(data);
    }
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
                { id: _.uniqueId(), name: "", type: "", required: false },
              ]);
            }}
          >
            Add Fields
          </Button>
          <Button className="w-full md:w-1/2 self-center" type="submit">
            Create Task
          </Button>
        </form>
      </Card>
    </Page>
  );
}
