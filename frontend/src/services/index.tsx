import { lazy } from "react";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
const Error = lazy(() => import("../pages/Error"));
const Timetable = lazy(() => import("../pages/Timetable"));
const Dashbord = lazy(() => import("../pages/Dashbord"));
const Profile = lazy(() => import("../pages/Profile"));
const Planner = lazy(() => import("../pages/Planner"));
const Courses = lazy(() => import("../pages/Courses"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Competitive = lazy(() => import("../pages/Competitive"));
const Details = lazy(() => import("../pages/Details"));
const Work = lazy(() => import("../pages/Work"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
import AdminError from "../pages/AdminError";
const AcademicCalendar = lazy(() => import("../pages/Calender"));

export {
  Details,
  AdminPage,
  Home,
  Login,
  Signup,
  Error,
  Timetable,
  Dashbord,
  Profile,
  Planner,
  Courses,
  Analytics,
  Competitive,
  Work,
  AdminError,
  AcademicCalendar,
};