import React, { useState, useEffect } from "react";
import _ from "lodash";
import Field from "../../ui/Field";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    console.log(fields, _.uniqueId());
  }, [fields]);
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
              key={"create-" + field.id}
              id={field.id}
              field={field.name}
              setFields={field.type}
              handleRemove={() =>
                setFields((prevFields) =>
                  prevFields.filter((prevField) => prevField.id !== field.id)
                )
              }
              // handleRemove={() => {
              //   console.log("remove", field.id);
              //   setFields((prevFields) => {
              //     const filteredFields = prevFields.filter(
              //       (prevField) => prevField.id !== field.id
              //     );
              //     return filteredFields.map((filteredField, i) => ({
              //       ...filteredField,
              //       id: i,
              //     }));
              //   });
              // }}
            />
          );
        })}

        <button
          type="button"
          className="px-5 w-full bg-blue-100 hover:bg-blue-200 sm:w-1/2 self-center mb-3"
          onClick={() => {
            setFields((prevFields) => [
              ...prevFields,
              { id: _.uniqueId(), name: "", type: "" },
            ]);
          }}
        >
          Add Fields
        </button>

        <button className="w-full md:w-1/2 self-center">Create</button>
      </form>
    </div>
  );
}
