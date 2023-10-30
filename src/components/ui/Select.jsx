import React, { useEffect, useState, useRef } from "react";
import styles from "./Select.module.css";
import { FaChevronDown } from "react-icons/fa";

export default function Select({
  children,
  id,
  value,
  onChange,
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
    console.log(value, valueIndex);
    setSelected(valueIndex);
  }, []);

  const handleClick = () => {
    setDropdownState((prevState) => !prevState);
  };

  return (
    <div className={styles.customSelect}>
      <select id={id} ref={selectRef} defaultValue={selected} required>
        {children}
      </select>
      <div className={styles.selected} onClick={handleClick}>
        <div className={styles.label}>{options[selected].value}</div>
        <div
          className={styles.icon}
          style={{
            transform: dropdownState ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <FaChevronDown />
        </div>
      </div>
      <div
        className={styles.options}
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
                  className={styles.option}
                  key={option.value + (props.key ? props.key : i)}
                  onClick={() => {
                    setSelected(i);
                    setDropdownState(false);
                    onChange(option.value);
                  }}
                >
                  {option.value}
                </div>
              );
          })}
      </div>
    </div>
  );
}
