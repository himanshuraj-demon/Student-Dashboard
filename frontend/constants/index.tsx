import { FiBookOpen, FiCalendar, FiPieChart } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { LuLayoutDashboard,LuCalendar } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";
import { GrPlan } from "react-icons/gr";

const links = [
  {
    name: "Dashboard",
    key: 1,
    path: "/dashboard",
    icon: (
      <LuLayoutDashboard size={22} className="text-[var(--text-secondary)]" />
    ),
  },
  {
    name: "Timetable",
    key: 2,
    path: "/timetable",
    icon: <FiCalendar size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Courses",
    key: 3,
    path: "/courses",
    icon: <FiBookOpen size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Analytics",
    key: 4,
    path: "/analytics",
    icon: <FiPieChart size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Planner",
    key: 5,
    path: "/planner",
    icon: <GrPlan size={22} className="text-[var(--text-secondary)]" />,
  },

  {
    name: "Details",
    key: 6,
    path: "/details",
    icon: <TbListDetails size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Work",
    key: 7,
    path: "/work",
    icon: <CgNotes size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Competitive",
    key: 8,
    path: "/competitive",
    icon: <FaCode size={22} className="text-[var(--text-secondary)]" />,
  },
  {
    name: "Calender",
    key: 9,
    path: "/calender",
    icon: <LuCalendar size={22} className="text-[var(--text-secondary)]" />,
  },
];

export { links };
