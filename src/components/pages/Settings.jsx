import React from "react";
import { motion } from "framer-motion";
import Page from "../ui/Page";
import Card from "../ui/Card";
import Button from "../ui/Button";
export default function Settings() {
  return (
    <Page>
      <h3 className="text-2xl font-bold mb-3">Settings</h3>
      <Card>
        <Button>Delete Registry</Button>
      </Card>
    </Page>
  );
}
