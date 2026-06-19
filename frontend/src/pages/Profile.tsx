import  { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import api from "../services/api";
import { ThemeToggle } from "../context/ThemeToggle";
import { SiGithub, SiCodeforces, SiLeetcode } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
import {
  MdDriveFileRenameOutline,
  MdOutlineMailLock,
  MdOutlineSave,
} from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
  const [isEditing, setEditing] = useState(false);
  const { user, setUser, logout } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });

  const watchedCpi = watch("cpi");
  const watchedSemester = watch("currentSemester");
  const watchedCredits = watch("creditsCompleted");

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
        { withCredentials: true },
      );
      setUser(res.data.user);
      setEditing(false);
      toast.success("User updated");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  useTitle("Profile");

  return (
    <div className="main">
      <Nav />
      <div className="mainprofilebox">
        <div className="profile-cover">
          <div className="cover-grid" />
          <div className="cover-glow" />
        </div>

        <div className="avatar-row">
          <div
            className="avatar-wrap"
            style={
              user?.profileImageUrl
                ? { backgroundImage: `url(${user.profileImageUrl})` }
                : undefined
            }>
            {!user?.profileImageUrl && (
              <span className="avatar-initials">{initials}</span>
            )}
          </div>

          <div className="avatar-info">
            <h1 className="avatar-name">{user?.name || "Your Name"}</h1>
            <p className="avatar-email">{user?.email}</p>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card stat-accent">
            <span className="stat-label">CPI</span>
            <span className="stat-val">
              {Number(watchedCpi || user?.details?.cpi || 0).toFixed(2)}
            </span>
            <span className="stat-sub">Cumulative performance</span>
          </div>
          <div className="stat-card stat-amber">
            <span className="stat-label">Semester</span>
            <span className="stat-val">
              {watchedSemester || user?.details?.currentSemester || "—"}
              <span className="stat-ord">th</span>
            </span>
            <span className="stat-sub">Current semester</span>
          </div>
          <div className="stat-card stat-green">
            <span className="stat-label">Credits</span>
            <span className="stat-val">
              {watchedCredits || user?.details?.creditsCompleted || 0}
            </span>
            <span className="stat-sub">Completed so far</span>
          </div>
        </div>

        <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile-section">
            <div className="section-title">
              <CgProfile size={18} />
              Personal information
            </div>

            <div className="div1">
              <div className="profile-field">
                <label className="profile-label">Full name</label>
                <input
                  {...register("name")}
                  className="profile-input"
                  disabled={!isEditing}
                  placeholder="Your full name"
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <MdOutlineMailLock size={15} /> Email
                </label>
                <input
                  {...register("email")}
                  disabled
                  className="profile-input"
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <GoInfo size={15} /> Branch
                </label>
                <select
                  {...register("branch")}
                  disabled={!isEditing}
                  className="profile-input">
                  {Branch.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <GoInfo size={15} /> Current semester
                </label>
                <select
                  {...register("currentSemester", { valueAsNumber: true })}
                  disabled={!isEditing}
                  className="profile-input">
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <GoInfo size={15} /> CPI
                </label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  max={10}
                  {...register("cpi", { valueAsNumber: true })}
                  disabled={!isEditing}
                  className="profile-input"
                />
                {errors.cpi && (
                  <span className="profile-error">
                    {String(errors.cpi.message)}
                  </span>
                )}
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <GoInfo size={15} /> Credits completed
                </label>
                <input
                  type="number"
                  min={0}
                  {...register("creditsCompleted", { valueAsNumber: true })}
                  disabled={!isEditing}
                  className="profile-input"
                />
                {errors.creditsCompleted && (
                  <span className="profile-error">
                    {String(errors.creditsCompleted.message)}
                  </span>
                )}
              </div>

              <div className="profile-field bio-field">
                <label className="profile-label">About me</label>
                <textarea
                  rows={4}
                  {...register("bio")}
                  disabled={!isEditing}
                  className="profile-input resize-none"
                  placeholder="Write something about yourself…"
                />
              </div>
            </div>
          </div>

          <div className="profile-section">
            <div className="section-title">
              <SiGithub size={16} />
              Profiles &amp; handles
            </div>

            {!isEditing && (
              <div className="handles-grid">
                <div className="handle-tile">
                  <CiLinkedin size={22} className="h-linkedin" />
                  <div>
                    <span className="handle-platform">LinkedIn</span>
                    <span className="handle-val">
                      {user?.details?.linkedin || "—"}
                    </span>
                  </div>
                </div>
                <div className="handle-tile">
                  <SiGithub size={18} className="h-github" />
                  <div>
                    <span className="handle-platform">GitHub</span>
                    <span className="handle-val">
                      {user?.details?.github || "—"}
                    </span>
                  </div>
                </div>
                <div className="handle-tile">
                  <SiCodeforces size={18} className="h-cf" />
                  <div>
                    <span className="handle-platform">Codeforces</span>
                    <span className="handle-val">
                      {user?.details?.codeforcesHandle || "—"}
                    </span>
                  </div>
                </div>
                <div className="handle-tile">
                  <SiLeetcode size={18} className="h-lc" />
                  <div>
                    <span className="handle-platform">LeetCode</span>
                    <span className="handle-val">
                      {user?.details?.codechefHandle || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="div1">
                <div className="profile-field">
                  <label className="profile-label">
                    <CiLinkedin size={15} /> LinkedIn handle
                  </label>
                  <input
                    {...register("linkedin")}
                    className="profile-input"
                    placeholder="handle only"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">
                    <SiGithub size={14} /> GitHub handle
                  </label>
                  <input
                    {...register("github")}
                    className="profile-input"
                    placeholder="handle only"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">
                    <SiCodeforces size={14} /> Codeforces handle
                  </label>
                  <input
                    {...register("codeforces")}
                    className="profile-input"
                    placeholder="handle only"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">
                    <SiLeetcode size={14} /> LeetCode handle
                  </label>
                  <input
                    {...register("codechef")}
                    className="profile-input"
                    placeholder="handle only"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="profile-footer">
            <ThemeToggle />

            <div className="footer-actions">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn btn-ghost">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}>
                    <MdOutlineSave size={16} />
                    {isSubmitting ? "Saving…" : "Save changes"}
                  </button>
                </>
              ) : (
                <>
                  <div onClick={logout} className="btn btn-danger">
                    Log out
                  </div>
                  <div
                    onClick={() => setEditing(true)}
                    className="btn btn-primary">
                    <MdDriveFileRenameOutline size={16} />
                    Edit profile
                  </div>
                </>
              )}
            </div>
          </div>

          {errors.root && (
            <p className="profile-errors">{errors.root.message}</p>
          )}
        </form>

        {user?.role === "ADMIN" ? 
        <div className="text-center bg-blue-600 text-white rounded-2xl mx-10 mt-5 py-2 cursor-pointer">
             <Link to={"/admin"}>Admin Panel</Link> 
        </div> 

        : ""}
      </div>
    </div>
  );
};

export default Profile;
