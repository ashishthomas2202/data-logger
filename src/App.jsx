import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/ui/layout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";
import CreateTask from "./components/pages/tasks/Create";
import {} from "react-icons/fa";
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
              <Route path="/tasks/create" Component={CreateTask} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </>
  );
}

export default App;
