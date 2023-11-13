import React, { useState, useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Select from "../../ui/Select";
export default function Edit({ editTask = "" }) {
  const { tasks, updateTasks } = useContext(TaskContext);
  const { selection, setSelection } = useState(editTask);

  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Edit Task</h3>
      <Card>
        <div>
          <label className="font-semibold">Select a task for editting:</label>
          <Select value={selection}>
            <option hidden>Choose a task...</option>
            {tasks.map((task) => (
              <option key={`option-${task.id}`} value={task.id}>
                {task.name}
              </option>
            ))}
          </Select>
        </div>
      </Card>
    </Page>
  );
}
