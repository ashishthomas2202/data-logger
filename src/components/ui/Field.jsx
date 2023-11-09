import React, { useState, useEffect } from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
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
    <div className="px-5 flex flex-col gap-3 border-2 sm:border-0 p-3 rounded sm:flex-row ">
      <div className="flex flex-col flex-1 items-center w-full mr-3">
        <label htmlFor={"required" + id} className="text-sm">
          Required:
        </label>
        <Checkbox
          id={"required" + id}
          className={"mt-3"}
          value={field.required}
          onChange={() => {
            handleChange({ ...field, required: !field.required });
          }}
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <label htmlFor={"fieldname" + id} className="text-sm">
          Field Name:
        </label>
        <Input
          name={"fieldname" + id}
          id={"fieldname" + id}
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => {
            let newData = { ...field, name: e.target.value };
            handleChange(newData);
          }}
          required
        />
      </div>
      <div className="flex flex-col items-start w-full ">
        <label htmlFor={"fieldtype" + id} className="text-sm">
          Field Type:
        </label>
        <Select
          value={field.type}
          id={"fieldtype" + id}
          onChange={(value) => {
            let newData = { ...field, type: value };
            handleChange(newData);
          }}
          required
        >
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
          className="flex justify-center items-center gap-3 bg-red-500 hover:bg-red-400 hover:border-red-400 text-white font-semibold mt-2 sm:mt-5 py-3.5 w-full"
          onClick={handleRemove}
        >
          <FaTimes />
          Remove
        </button>
      </div>
    </div>
  );
}
