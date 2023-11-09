import React, { useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { BsFileEarmarkText } from "react-icons/bs";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-5">Tasks Page</h3>
      {tasks.length == 0 && (
        <Card className={"h-1/2 flex justify-center items-center"}>
          <div className="flex flex-col justify-center items-center">
            <BsFileEarmarkText className="text-8xl mb-2" />
            <h3 className="font-bold text-xl">No Task Found</h3>
            <p className="font-light text-xs">
              <Link to="/tasks/create">Create a new task.</Link>
            </p>
          </div>
        </Card>
      )}
    </Page>
  );
}
