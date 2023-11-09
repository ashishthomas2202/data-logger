import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/ui/layout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";
import Tasks from "./components/pages/tasks/Tasks";
import CreateTask from "./components/pages/tasks/Create";
import ReadTask from "./components/pages/tasks/Read";
import UpdateTask from "./components/pages/tasks/Update";
import DeleteTask from "./components/pages/tasks/Delete";

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
        { name: "Read", to: "/tasks/read", icon: <BsBook /> },
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
        <Layout links={links}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route exact path="/" Component={Dashboard} />
              <Route path="/settings" Component={Settings} />
              <Route path="/initialize" Component={Initialize} />
              <Route exact path="/tasks" Component={Tasks} />
              <Route exact path="/tasks/create" Component={CreateTask} />
              <Route exact path="/tasks/read" Component={ReadTask} />
              <Route exact path="/tasks/update" Component={UpdateTask} />
              <Route exact path="/tasks/delete" Component={DeleteTask} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </>
  );
}

export default App;
