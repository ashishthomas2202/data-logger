import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      This is Home page <Link to="/initialize">Initialize</Link>
    </div>
  );
}
