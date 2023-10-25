import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/ui/layout";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route path="/settings" Component={Settings} />
              <Route path="/initialize" Component={Initialize} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </>
  );
}

export default App;
