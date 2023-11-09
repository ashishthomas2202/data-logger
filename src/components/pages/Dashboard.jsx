import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../ui/Page";

export default function Dashboard() {
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-5">Dashboard</h3>
      <Link to="/initialize">Initialize</Link>
      <br />
      <Link to="/tasks/create">Create Task</Link>
    </Page>
  );
}
