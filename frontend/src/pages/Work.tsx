import React, { useState } from "react";
import AiSidebar from "../components/AiSidebar";
import { LuBotMessageSquare } from "react-icons/lu";
import Nav from "../services/Nav";
import Notes from "./Notes";
import Todos from "./Todo";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdNote } from "react-icons/md";

type TopbarView = "notes" | "todos";
const Work = () => {
  const [isAiOpen, setAiOpen] = useState(false);
  const [topbarView, setTopbarView] = useState<TopbarView>("notes");

  const AiSidebarWithProps = AiSidebar as React.ComponentType<{
    setAiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  return (
    <div className={`main ${isAiOpen ? "ai-open" : ""} overflow-hidden`}>
      <Nav />
      <section className="flex flex-col h-dvh">
        <div className="flex sticky rounded-xl overflow-hidden border border-gray-300 bg-[rgba(59,130,246,0.06)] shadow-sm">
          <button
            onClick={() => setTopbarView("notes")}
            className={`flex-1 py-2 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2
              ${topbarView === "notes" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
            <FaRegNoteSticky size={15}/> Notes
          </button>
          <button
            onClick={() => {
              setTopbarView("todos");
            }}
            className={`flex-1 py-2 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2
              ${topbarView === "todos" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
             <MdNote size={15}/> To-Dos
          </button>
        </div>
        {topbarView === "notes" ? <Notes /> : <Todos />}
      </section>
      {isAiOpen && <AiSidebarWithProps setAiOpen={setAiOpen} />}
      {!isAiOpen && (
        <button
          className="fixed md:bottom-6 md:right-5 bottom-25 right-5"
          onClick={() => setAiOpen(true)}>
          <LuBotMessageSquare size={35} />
        </button>
      )}
    </div>
  );
};

export default Work;
