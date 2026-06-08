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
  console.log(user)
  return (
    <div className={`main ${isAiOpen ? "ai-open" : ""}`}>
      <Nav />
      <div>
        <h1>{user?.name}</h1>
        {auth ? <h1>Hi</h1> : <h1>no hi</h1>}
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

export default Dashbord;
