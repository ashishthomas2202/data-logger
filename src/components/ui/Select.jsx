import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Select({
  children,
  id,
  className = "",
  value,
  onChange = () => {},
  required,
  ...props
}) {
  const selectRef = useRef(null);
  const [options, setOptions] = useState([{ value: "" }]);
  const [selected, setSelected] = useState(0);
  const [dropdownState, setDropdownState] = useState(false);

  useEffect(() => {
    const optionsList = Array.apply(null, selectRef.current.options);
    setOptions(optionsList);

    let valueIndex = optionsList.findIndex((option) => option.value == value);
    if (valueIndex == -1) {
      valueIndex = 0;
    }
    setSelected(valueIndex);
  }, []);

  const handleClick = () => {
    setDropdownState((prevState) => !prevState);
  };

  return (
    <div className={`w-full dark:text-gray-950 ${className}`}>
      <select
        id={id}
        className="hidden"
        ref={selectRef}
        defaultValue={selected}
        required
      >
        {children}
      </select>
      <div
        className="bg-white rounded-lg flex space-between items-center p-4"
        onClick={handleClick}
      >
        <div className="flex-1 text-center">{options[selected].text}</div>
        <div
          style={{
            transform: dropdownState ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <FaChevronDown />
        </div>
      </div>
      <div
        className="bg-white p-1 rounded-lg overflow-y-scroll w-full max-h-7 transition-all"
        style={{
          marginTop: dropdownState ? "0.1rem" : "0",
          visibility: dropdownState ? "visible" : "hidden",
          opacity: dropdownState ? 1 : 0,
          maxHeight: dropdownState ? "150px" : "0",
        }}
      >
        {options.length > 0 &&
          options.map((option, i) => {
            if (!option.hidden)
              return (
                <div
                  className={`${
                    value == option.value && "bg-slate-200 dark:bg-gray-50"
                  } bg-white hover:bg-gray-50 dark:hover:bg-gray-200 text-center py-2 cursor-pointer transition-all`}
                  key={option.value + (props.key ? props.key : i)}
                  onClick={() => {
                    setSelected(i);
                    setDropdownState(false);
                    onChange(option.value);
                  }}
                >
                  {option.text}
                </div>
              );
          })}
      </div>
    </div>
  );
}
