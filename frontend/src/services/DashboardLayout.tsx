import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function DashboardLayout() {
  const [isAiOpen, setAiOpen] = useState(false);

  return (
    <div className={`main ${isAiOpen ? "ai-open" : ""} overflow-hidden`}>
      <Nav />
      <Outlet context={{ isAiOpen, setAiOpen }} />
    </div>
  );
}
