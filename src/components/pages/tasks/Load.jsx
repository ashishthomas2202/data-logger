import React, { useState, useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
export default function Load() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const loadTask = (location) => {
    window.api
      .send("load-task", location)
      .then((data) => {
        if (data.status === "success") {
          updateTasks();
          alert("Task Loaded Successfully!");
          navigate("/tasks");
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleChooseLocation = () => {
    window.api
      .send("choose-location")
      .then((data) => {
        if (data.status === "success") {
          setLocation(data.path);
        } else if (data.status === "canceled") {
          return;
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (location.length == 0) {
      alert("Please choose a location to load the task data");
      setIsLoading(false);
    } else {
      loadTask(location);
    }
  };
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Load Task</h3>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <div className="px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 outline outline-2 outline-white rounded-lg">
            <div className="w-full">
              <p className={location.length == 0 ? "" : "self-start"}>
                Choose a folder location to load the task data
              </p>
              <p className="text-ellipsis overflow-hidden text-xs text-pink-300">
                {location}
              </p>
            </div>
            <Button
              className="w-full max-w-[300px] sm:w-1/2"
              onClick={handleChooseLocation}
            >
              Choose
            </Button>
          </div>

          <Button
            className="w-full md:w-1/2 self-center"
            type="submit"
            loading={isLoading}
          >
            Load Task
          </Button>
        </form>
      </Card>
    </Page>
  );
}
