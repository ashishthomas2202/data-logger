import React, { useState } from "react";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
export default function Load() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  };
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Load Task</h3>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <div className="px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 outline outline-2 outline-white rounded-lg">
            <div className="w-full">
              <p className={location.length == 0 ? "" : "self-start"}>
                Choose a folder location to save the task data
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
