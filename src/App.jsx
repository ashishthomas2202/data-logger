import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ui/layout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";
import Tasks from "./components/pages/tasks/Tasks";
import CreateTask from "./components/pages/tasks/Create";
import ManageTask from "./components/pages/tasks/Manage";
import UpdateTask from "./components/pages/tasks/Update";
import DeleteTask from "./components/pages/tasks/Delete";
import { TaskContextProvider } from "./context/TaskContext";
import {
  BsGrid,
  BsListNested,
  BsPlusCircle,
  BsBook,
  BsArrowRepeat,
  BsTrash,
  BsGear,
} from "react-icons/bs";
function App() {
  const links = [
    { name: "Dashboard", to: "/", icon: <BsGrid /> },
    {
      name: "Tasks",
      to: "/tasks",
      icon: <BsListNested />,
      links: [
        { name: "Create", to: "/tasks/create", icon: <BsPlusCircle /> },
        { name: "Manage", to: "/tasks/manage", icon: <BsBook /> },
        { name: "Update", to: "/tasks/update", icon: <BsArrowRepeat /> },
        { name: "Delete", to: "/tasks/delete", icon: <BsTrash /> },
      ],
    },
    {
      name: "Settings",
      to: "/settings",
      icon: <BsGear />,
    },
  ];
  return (
    <>
      <Router>
        <TaskContextProvider>
          <Layout links={links}>
            <Routes>
              <Route exact path="/" Component={Dashboard} />
              <Route path="/settings" Component={Settings} />
              <Route path="/initialize" Component={Initialize} />
              <Route exact path="/tasks" Component={Tasks} />
              <Route exact path="/tasks/create" Component={CreateTask} />
              <Route exact path="/tasks/manage" Component={ManageTask} />
              <Route exact path="/tasks/update" Component={UpdateTask} />
              <Route exact path="/tasks/delete" Component={DeleteTask} />
            </Routes>
          </Layout>
        </TaskContextProvider>
      </Router>
    </>
  );
}

export default App;
