import React from "react";
import styles from "./Checkbox.module.css";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({ id, className, value = false, onChange }) {
  return (
    <div
      className={`${styles.checkbox} ${className}`}
      onClick={() => {
        onChange();
      }}
    >
      <span style={{ visibility: value ? "visible" : "hidden" }}>
        <FaCheck />
      </span>

      <input
        id={id}
        name={id}
        type="checkbox"
        value={value}
        onChange={onChange}
        hidden
      />
    </div>
  );
}
