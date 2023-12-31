import React, { useState, useContext, useRef, useEffect } from "react";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../../../context/TaskContext";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { BsFileEarmarkText } from "react-icons/bs";
import TimeAgo from "../../ui/TimeAgo";
import Button from "../../ui/Button";
import { BsPencil, BsTrash, BsFolder } from "react-icons/bs";
import Input from "../../ui/Input";
import Dialog from "../../ui/Dialog";
import Checkbox from "../../ui/Checkbox";

export default function Tasks() {
  const navigate = useNavigate();

  const [dialogState, setDialogState] = useState({
    task: {},
    open: false,
    input: "",
    deleteFolder: false,
    disabledButton: true,
  });
  const { tasks, updateTasks } = useContext(TaskContext);

  useEffect(() => {
    if (_.lowerCase(dialogState.input) == _.lowerCase(dialogState.task.name)) {
      setDialogState((prevState) => ({ ...prevState, disabledButton: false }));
    } else {
      setDialogState((prevState) => ({ ...prevState, disabledButton: true }));
    }
  }, [dialogState.input, dialogState.task.name]);

  const handleEdit = (task) => {
    navigate("/tasks/edit", { state: { task } });
  };
  const handleDelete = (task) => {
    setDialogState((prevState) => ({ ...prevState, task: task, open: true }));
  };

  const closeDialog = () => {
    setDialogState((prevState) => ({
      ...prevState,
      task: {},
      input: "",
      disabledButton: true,
      deleteFolder: false,
      open: false,
    }));
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    window.api
      .send("delete-task", {
        task: dialogState.task,
        deleteFolder: dialogState.deleteFolder,
      })
      .then((data) => {
        if (data.status === "success") {
          closeDialog();
          updateTasks();
          alert("Task Deleted Successfully!");
        } else {
          alert("Error: " + data.message);
        }
      });
  };

  const handleOpenFolder = async (location) => {
    window.api.send("open-folder", location).then((data) => {
      if (data.status !== "success") {
        alert("Error: " + data.message);
      }
    });
  };

  return (
    <Page isLoading={tasks === undefined}>
      <h3 className="text-2xl font-bold mb-5">Tasks Page</h3>
      {tasks && tasks.length == 0 && (
        <Card
          className={
            "h-5/6 min-h-[200px] max-h-96 flex justify-center items-center"
          }
        >
          <div className="flex flex-col p-6 justify-center items-center">
            <BsFileEarmarkText className="text-8xl mb-2" />
            <h3 className="font-bold text-xl">No Task Found</h3>
            <p className="font-light text-xs">
              <Link to="/tasks/create">Create a new task.</Link>
            </p>
          </div>
        </Card>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Dialog
          // isOpen={dialogOpen}
          isOpen={dialogState.open}
          title="Delete Task"
          size="lg"
          onClose={closeDialog}
        >
          <p className="text-white mb-3">
            The task will be removed from the application but the "
            <span className="font-semibold text-violet-500">
              {dialogState.task.name}
            </span>
            " data folder will not be affected and will remain on your desktop
            at:
            <br />
            <Button
              variant="clear"
              className="text-sm text-violet-500 h-2 mb-3"
              onClick={() => handleOpenFolder(dialogState.task.location)}
            >
              {dialogState.task.location}
            </Button>
            To permanently delete the task folder and all its contents, please
            tick the checkbox below.
            <br />{" "}
            <span className="text-red-500 text-sm">
              Note: This action is irreversible and will result in permanent
              loss of data within the task folder.
            </span>
          </p>
          <form className="flex flex-col items-center gap-3 ">
            <div className="flex self-start">
              <Checkbox
                value={dialogState.deleteFolder}
                onChange={(e) => {
                  setDialogState((prevState) => ({
                    ...prevState,
                    deleteFolder: !prevState.deleteFolder,
                  }));
                }}
              />
              <label className="pl-3 text-white">
                Delete Task Folder? (Permanent)
              </label>
            </div>

            <label className="self-start text-white">
              {/* To confirm, type "{dialogTask.name}" in the box below? */}
              For confirmation and to proceed with deletion, type "
              <span className="font-bold text-violet-500">
                {_.trim(dialogState.task.name)}
              </span>
              " in the text box below. into the input field below to verify your
              action.
            </label>

            <Input
              type="text"
              className="bg-gray-100"
              value={dialogState.input}
              onChange={(e) =>
                setDialogState((prevState) => ({
                  ...prevState,
                  input: e.target.value,
                }))
              }
            />

            <Button
              variant="danger"
              type="submit"
              className=" w-fit"
              disabled={dialogState.disabledButton}
              onClick={confirmDelete}
            >
              Delete the task
            </Button>
          </form>
        </Dialog>

        {tasks &&
          tasks.map((task) => {
            return (
              <Card key={task.id} className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-lg font-bold ">{task.name}</p>
                  <div className="flex gap-1">
                    <Button
                      className="px-2 h-2"
                      onClick={() => handleEdit(task)}
                    >
                      <BsPencil />
                    </Button>
                    <Button
                      variant="danger"
                      className="px-2 h-2"
                      onClick={() => handleDelete(task)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className=" text-8xl">{task.totalRecords}</span>
                  <span className="text-sm font-bold">Records</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">Total Fields: {task.totalFields}</p>
                    <p className="text-sm">
                      Updated: <TimeAgo timestamp={task.updatedAt} shortHand />{" "}
                    </p>
                    <p className="text-sm">
                      Created: <TimeAgo timestamp={task.createdAt} shortHand />{" "}
                    </p>
                  </div>
                  <Button
                    className="px-5 py-5"
                    onClick={() => handleOpenFolder(task.location)}
                  >
                    <BsFolder className="text-lg" />
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>
    </Page>
  );
}
