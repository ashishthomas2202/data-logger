import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ui/layout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";
import Tasks from "./components/pages/tasks/Tasks";
import CreateTask from "./components/pages/tasks/Create";
import LoadTask from "./components/pages/tasks/Load";
import EditTask from "./components/pages/tasks/Edit";
import DeleteTask from "./components/pages/tasks/Delete";
import { TaskContextProvider } from "./context/TaskContext";
import {
  BsGrid,
  BsListNested,
  BsPlusCircle,
  BsUpload,
  BsPencilSquare,
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
        { name: "Load", to: "/tasks/load", icon: <BsUpload /> },
        { name: "Edit", to: "/tasks/edit", icon: <BsPencilSquare /> },
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
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/initialize" element={<Initialize />} />
              <Route exact path="/tasks" element={<Tasks />} />
              <Route exact path="/tasks/create" element={<CreateTask />} />
              <Route exact path="/tasks/load" element={<LoadTask />} />
              <Route exact path="/tasks/edit" element={<EditTask />} />
              <Route exact path="/tasks/delete" element={<DeleteTask />} />
            </Routes>
          </Layout>
        </TaskContextProvider>
      </Router>
    </>
  );
}

export default App;
