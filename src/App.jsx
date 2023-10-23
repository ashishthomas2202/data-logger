import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Initialize from "./components/pages/Initialize";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/settings" Component={Settings} />
          <Route path="/initialize" Component={Initialize} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
