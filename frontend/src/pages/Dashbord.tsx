import React from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useAuth } from "../hooks/useAuth";

const Dashbord = () => {
  const { auth, user } = useAuth();
  console.log(user);
  useTitle("Dashboard");
  return (
    <div className="main">
      <Nav />
      <div>
        <h1>{user?.name}</h1>
        {auth ? <h1>Hi</h1> : <h1>no hi</h1>}
      </div>
    </div>
  );
};

export default Dashbord;
