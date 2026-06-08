import React, { useEffect } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
type Semester={
  sem1:1,
  sem2:2,
  sem3:3,
  sem4:4,
  sem5:5,
  sem6:6,
  sem7:7,
  sem8:8,
  sem9:9,
  sem10:10,
  sem11:11,
  sem12:12,
}
interface FormData {
  cpi:number;
  currentSemester:Semester;
  bio:string,
  linkedin:string,
  github:string,
  codeforces:string,
  codechef:string,
  creditsCompleted:number,
  branch:string,
  profileImg:string | "./images/default.jpg" 
}

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });
  useTitle("Profile");
  const {user}=useAuth();
  return (
    <div className="main">
      <Nav />
      <div className="w-dvw md:w-full md:h-full h-dvh border-2 border-amber-100 rounded-2xl flex justify-center items-center flex-col">
        <div className="w-80 md:w-[95%] self-center h-1/6 md:h-1/5 my-10 rounded-2xl bg-[url(./images/background.webp)] flex justify-center items-center">
          <div className="w-18 h-18 bg-red-300 rounded-3xl bg-center  bg-cover relative bg-[url(./images/default.jpg)] top-15"></div>
        </div>
        <div>
          <form>
            <label className="profile-label">What's your username?</label>
            <input
              placeholder="e.g. grace_hopper"
              {...register("name", {
                required: { value: true, message: "Username Required" },
              })}
              type="text"
              className="profile-input"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
