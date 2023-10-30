import React, { useState } from "react";
import Select from "../../ui/Select";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [fields, setFields] = useState([]);
  return (
    <div>
      <h1 className="mb-3">Create Task</h1>
      <form className="w-screen p-5 max-w-5xl flex flex-col gap-y-3">
        <div className="flex flex-col items-start w-full mb-3 ">
          <label className="text-sm" htmlFor="taskname">
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
        <div className="px-5 flex flex-col gap-y-3">
          <div className="flex flex-col items-start w-full ">
            <label className="text-sm">Field Name:</label>
            <input
              className="w-full p-4 rounded"
              type="text"
              name="taskname"
              id="taskname"
              placeholder="Task Name"
            />
          </div>
          <div className="flex flex-col items-start w-full ">
            <label className="text-sm">Field Type:</label>
            {/* <select>
              <option defaultChecked hidden>
                Select a type
              </option>
              <option value={"text"}>Text</option>
              <option value={"number"}>Numbers</option>
              <option value={"money"}>Money</option>
              <option value={"date"}>Date</option>
              <option value={"file"}>File</option>
              <option value={"files"}>Files</option>
            </select>
             */}
            <Select>
              <option default hidden>
                Select a type
              </option>
              <option value={"text"}>Text</option>
              <option value={"number"}>Numbers</option>
              <option value={"money"}>Money</option>
              <option value={"date"}>Date</option>
              <option value={"file"}>File</option>
              <option value={"files"}>Files</option>
            </Select>
            {/* <select>
              <option selected hidden>
                Select a type
              </option>
              <option value={"text"}>Text</option>
              <option value={"number"}>Numbers</option>
              <option value={"money"}>Money</option>
              <option value={"date"}>Date</option>
              <option value={"file"}>File</option>
              <option value={"files"}>Files</option>
            </select> */}
          </div>
        </div>

        <button className="">Create</button>
      </form>
    </div>
  );
}
