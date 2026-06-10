import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import AiSidebar from "../components/AiSidebar";
import { LuBotMessageSquare } from "react-icons/lu";
import Notesblock from "../components/Notesblock";

const Notes = () => {
  const [isAiOpen, setAiOpen] = useState(false);
  const AiSidebarWithProps = AiSidebar as React.ComponentType<{
    setAiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  useTitle("Notes");
  return (
    <div className={`main ${isAiOpen ? "ai-open" : ""}`}>
      <Nav />
      <div className="flex flex-col gap-2 notesmenu m-1 p-3 rounded-2xl overflow-x-hidden">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            📝 Notes Workspace
          </h1>

          <p className="text-sm opacity-70 mt-2 mx-3">
            Create, organize and search your study notes
          </p>
        </div>
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="🔍︎ Search here ..."
            className="w-[95%] p-2 bg-black text-white notesinput rounded-2xl self-center"
          />
        </div>

        <div className="flex flex-wrap justify-center">
          <Notesblock/>
        </div>
      </div>

      {isAiOpen && <AiSidebarWithProps setAiOpen={setAiOpen} />}
      {!isAiOpen && (
        <button
          className="fixed bottom-2 right-2"
          onClick={() => setAiOpen(true)}>
          <LuBotMessageSquare size={35} />
        </button>
      )}
    </div>
  );
};

export default Notes;
