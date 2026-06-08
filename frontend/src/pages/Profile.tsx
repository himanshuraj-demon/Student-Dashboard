import React, { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../hooks/api";
import { ThemeToggle } from "../context/ThemeToggle";

interface FormData {
  name: string;
  email?: string;
  cpi: number;
  currentSemester: number;
  bio: string;
  linkedin: string;
  github: string;
  codeforces: string;
  codechef: string;
  creditsCompleted: number;
  branch: string;
  profileImg: string;
}

const Branch: string[] = [
  "Artificial Intelligence",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science & Engineering",
  "Electrical Engineering",
  "Integrated Circuit Design & Technology",
  "Materials Engineering",
  "Mechanical Engineering",
];

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const { user, setUser,logout } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name || "",
      email: user.email || "",
      branch: user.details?.branch || "",
      currentSemester: user.details?.currentSemester || 1,
      cpi: user.details?.cpi || 0,
      creditsCompleted: user.details?.creditsCompleted || 0,
      bio: user.details?.bio || "",
      linkedin: user.details?.linkedin || "",
      github: user.details?.github || "",
      codeforces: user.details?.codeforcesHandle || "",
      codechef: user.details?.codechefHandle || "",
      profileImg: user.profileImageUrl,
    });
  }, [user, reset]);
    const onSubmit = async (data: FormData) => {
      console.log(data);
    try {
      const res = await api.post(
        "/user/update-profile",
        {
          name: data.name,

          branch: data.branch,
          currentSemester: Number(data.currentSemester),
          cpi: Number(data.cpi),
          creditsCompleted: Number(data.creditsCompleted),

          bio: data.bio,

          linkedin: data.linkedin,
          github: data.github,
          codeforcesHandle: data.codeforces,
          codechefHandle: data.codechef,
        },
        {
          withCredentials: true,
        },
      );
      setUser(res.data.user);
      setEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
      } else {
        setError("root", {
          message: "Something went wrong",
        });
      }
    }
  };

  useTitle("Profile");
  return (
    <div className="main">
      <Nav />
      <div className="mainprofilebox">
        <div className="profile flex justify-center rounded-b-2xl">
          <div className="w-20 h-20 md:w-30 md:h-30 bg-red-300 rounded-3xl bg-center bg-cover relative bg-[url(./images/default.jpg)] top-15 items-center"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section-title">Personal Information</div>

          <div className="div1">
            <div className="profile-field">
              <label className="profile-label">Full Name</label>

              <input
                {...register("name")}
                className="profile-input"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Email</label>

              <input
                {...register("email")}
                disabled
                className="profile-input"
              />
            </div>
          </div>
          <div className="div1">
            <div className="profile-field">
              <label className="profile-label">Branch</label>
              <select
                {...register("branch")}
                disabled={!isEditing}
                className="profile-input">
                {Branch.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="profile-field">
              <label className="profile-label">Current Semester</label>

              <select
                {...(register("currentSemester", { valueAsNumber: true }))}
                disabled={!isEditing}
                className="profile-input">
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="div1">
            <div className="profile-field">
              <label className="profile-label">CPI</label>

              <input
                type="number"
                step="0.01"
                {...(register("cpi", { valueAsNumber: true ,minLength:{value:0,message:"Invalid Input !!"},maxLength:{value:0,message:"Invalid input"}}))}
                disabled={!isEditing}
                className="profile-input"
                min={0}
              />
              {errors.cpi && (
                <span className="profile-error">
                  {String(errors.cpi.message)}
                </span>
              )}
            </div>

            <div className="profile-field">
              <label className="profile-label">Credits Completed</label>

              <input
                type="number"
                {...(register("creditsCompleted", { valueAsNumber: true,minLength:{value:0,message:"Invalid Input !!"} }))}
                disabled={!isEditing}
                className="profile-input"
                min={0}
              />
              {errors.creditsCompleted && (
                <span className="profile-error">
                  {String(errors.creditsCompleted.message)}
                </span>
              )}
            </div>
          </div>
          <div className="div1">
            <div className="profile-field">
              <label className="profile-label">LinkedIn</label>

              <input
                {...register("linkedin")}
                disabled={!isEditing}
                className="profile-input"
                placeholder="Only Enter handlename"
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">Github</label>

              <input
                {...register("github")}
                disabled={!isEditing}
                className="profile-input"
                placeholder="Only Enter handlename"
              />
            </div>
          </div>

          <div className="div1">
            <div className="profile-field">
              <label className="profile-label">Codeforces</label>

              <input
                {...register("codeforces")}
                disabled={!isEditing}
                className="profile-input"
                placeholder="Only Enter handlename"
              />
            </div>

            <div className="profile-field">
              <label className="profile-label">CodeChef</label>

              <input
                {...register("codechef")}
                disabled={!isEditing}
                className="profile-input"
                placeholder="Only Enter handlename"
              />
            </div>
          </div>
          <div className="profile-field bio-field">
            <label className="profile-label">About Me</label>

            <textarea
              rows={5}
              {...register("bio")}
              disabled={!isEditing}
              className="profile-input resize-none"
              placeholder="Write something ..."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
            {isEditing && (
              <div
                onClick={() => setEditing(false)}
                className="w-full md:w-36 h-10 rounded-xl cursor-pointer bg-red-500 font-semibold flex justify-center items-center">
                Cancel
              </div>
            )}
            {!isEditing && (
              <div
                onClick={() => logout}
                className="w-full md:w-36 h-10 rounded-xl cursor-pointer bg-red-500 font-semibold flex justify-center items-center">
                Log Out
              </div>
            )}
            <ThemeToggle/>

            {isEditing ? (
              <button
                type="submit"
                className="w-full md:w-36 h-10 rounded-xl bg-green-500 font-semibold"
                disabled={isSubmitting}>
                Save Changes
              </button>
            ) : (
              <div
                onClick={() => setEditing(true)}
                className="w-full md:w-36 h-10 rounded-xl cursor-pointer bg-blue-500 font-semibold justify-center items-center flex">
                Edit Profile
              </div>
            )}
          </div>
        </form>
        {errors.root && (
          <span className="profile-errors">{errors.root.message}</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
