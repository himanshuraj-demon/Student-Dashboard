import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,Login,Signup,Error,Timetable,Dashbord, Todo, Calender, Notes, Courses, Analytics, Profile, Competitive} from "./services"


const App = () => {
  const [auth, setAuth] = useState(false);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get("http://192.168.1.6:3000/user/me", {
  //         withCredentials: true,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       alert(error);
  //     }
  //   };

  //   fetchUser();
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!auth ? <Home /> : <Error />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/competitive" element={<Competitive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
