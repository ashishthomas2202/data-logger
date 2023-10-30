import React, { useState, useEffect } from "react";
import Select from "./Select";
import { FaTimes } from "react-icons/fa";

export default function Field({
  field,
  setFields,
  id,
  handleChange,
  handleRemove,
  onChange,
}) {
  return (
    <div className="px-5 flex flex-col gap-3 sm:flex-row">
      <div className="flex flex-col items-start w-full ">
        <label htmlFor="fieldname" className="text-sm">
          Field Name:
        </label>
        <input
          className="w-full p-4 rounded"
          type="text"
          name="fieldname"
          id="fieldname"
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => {
            let newData = { ...field, name: e.target.value };
            handleChange(newData);
          }}
        />
      </div>
      <div className="flex flex-col items-start w-full ">
        <label className="text-sm">Field Type:</label>
        <Select
          value={field.type}
          onChange={(value) => {
            let newData = { ...field, type: value };
            handleChange(newData);
          }}
        >
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
      </div>
      <div className="flex flex-col items-start">
        <button
          type="button"
          className="flex justify-center items-center gap-3 bg-red-700 hover:bg-red-600 hover:border-red-600 text-white font-semibold mt-2 sm:mt-5 py-3.5 w-full"
          onClick={handleRemove}
        >
          <FaTimes />
          Remove
        </button>
      </div>
    </div>
  );
}
