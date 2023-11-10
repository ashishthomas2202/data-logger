import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TaskContext } from "../../context/TaskContext";
import Page from "../ui/Page";
import Card from "../ui/Card";

export default function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext);
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-5">Dashboard</h3>
      {/* <Card className="dark:bg-slate-700"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-center items-center">
          <h2>Total Task</h2>
          <p className="text-8xl">{tasks.length}</p>
        </Card>
      </div>
      {/* </Card> */}
    </Page>
  );
}
