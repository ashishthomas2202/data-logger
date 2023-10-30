import React, { useState } from "react";
import Field from "../../ui/Field";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [fields, setFields] = useState([]);
  return (
    <div>
      <h1 className="mb-3">Create Task</h1>
      <form className="w-screen p-5 max-w-5xl flex flex-col gap-y-3">
        <div className="flex flex-col items-start w-full mb-3 ">
          <label className="text-lg font-semibold" htmlFor="taskname">
            Task Name:{" "}
          </label>
          <input
            className="w-full p-4 rounded"
            type="text"
            name="taskname"
            id="taskname"
            placeholder="Task Name"
          />
        </div>
        <div className="flex flex-col items-start w-full ">
          <h2 className="text-lg font-semibold">Fields</h2>
        </div>

        {fields.map((field, index) => {
          return (
            <Field
              key={"create" + index}
              field={field.name}
              setFields={field.type}
            />
          );
        })}

        <button
          type="button"
          className="px-5 w-full bg-blue-100 hover:bg-blue-200 sm:w-1/2 self-center mb-3"
          onClick={() => {
            console.log("clicked", fields);
            setFields((prevFields) => [...prevFields, { name: "", type: "" }]);
          }}
        >
          Add Fields
        </button>

        <button className="w-full md:w-1/2 self-center">Create</button>
      </form>
    </div>
  );
}
