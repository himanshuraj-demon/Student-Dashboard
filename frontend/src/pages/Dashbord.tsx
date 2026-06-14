import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useAuth } from "../hooks/useAuth";
import AiSidebar from "../components/AiSidebar";
import { LuBotMessageSquare } from "react-icons/lu";

const Dashbord = () => {
  const { auth, user } = useAuth();
  const [isAiOpen, setAiOpen] = useState(false);
  const AiSidebarWithProps = AiSidebar as React.ComponentType<{
    setAiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  useTitle("Dashboard");
  return (
    <div className={`main ${isAiOpen ? "ai-open" : ""}`}>
      <Nav />
      <div className="flex flex-col gap-1 h-dvh w-dvw md:w-auto">

        <div className="h-16 bg-white m-2 flex items-center">
          <h1 className="font-semibold text-3xl"> Welcome {user?.name}</h1>
        </div>
        



      </div>

      







      
      {isAiOpen && <AiSidebarWithProps setAiOpen={setAiOpen} />}
      {!isAiOpen && (
        <button
          className="fixed  md:bottom-6 md:right-5 bottom-25 right-5"
          onClick={() => setAiOpen(true)}>
          <LuBotMessageSquare size={35} />
        </button>
      )}
    </div>
  );
};

export default Dashbord;
