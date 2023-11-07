import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "../ui/Page";

export default function Dashboard() {
  return (
    <Page>
      This is Dashboard page
      <Link to="/initialize">Initialize</Link>
      <br />
      <Link to="/tasks/create">Create Task</Link>
    </Page>
  );
}
