import {
  FiHome,
  FiBookOpen,
  FiCalendar,
  FiPieChart,
  FiUser,
} from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { GrSchedule } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";

const links = [
  {
    name: "Home",
    key:0,
    path: "/",
    icon: <FiHome size={22} />,
  },
  {
    name: "Dashboard",
    key:1,
    path: "/dashboard",
    icon: <LuLayoutDashboard size={22} />,
  },
  {
    name: "Timetable",
    key:2,
    path: "/timetable",
    icon: <FiCalendar  size={22} />,
  },
  {
    name: "Courses",
    key:3,
    path: "/courses",
    icon: <FiBookOpen size={22} />,
  },
  {
    name: "Calendar",
    key:4,
    path: "/calendar",
    icon: <GrSchedule size={22} />,
  },
  {
    name: "Analytics",
    key:5,
    path: "/analytics",
    icon: <FiPieChart size={22} />,
  },
  {
    name: "Notes",
    key:6,
    path: "/notes",
    icon: <CgNotes size={22} />,
  },
  {
    name: "To-do",
    key:7,
    path: "/todo",
    icon: <FiCheckSquare size={22} />,
  },
  {
    name: "Competitive",
    key:8,
    path: "/competitive",
    icon: <FaCode size={22} />,
  },
];

export {
    links
}