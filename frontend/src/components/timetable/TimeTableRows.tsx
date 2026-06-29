import { FaCheck } from "react-icons/fa6";
import { type CourseEntry } from "../../../constants/timetabletypes";

type TimeTableProp = {
  course: CourseEntry;
  cources: CourseEntry[];
  setCources: React.Dispatch<React.SetStateAction<CourseEntry[]>>;
};

export const TimeTableRows: React.FC<TimeTableProp> = ({
  course,
  cources,
  setCources,
}) => {
  const selected = cources.some(
    (c) => c["Course Code"] === course["Course Code"],
  );

  const handleToggle = (course: CourseEntry) => {
    setCources((prev) => {
      const exists = prev.some(
        (c) => c["Course Code"] === course["Course Code"],
      );

      if (exists) {
        return prev.filter((c) => c["Course Code"] !== course["Course Code"]);
      }

      return [...prev, course];
    });
  };

  return (
    <li
      onClick={() => handleToggle(course)}
      className={`flex items-center justify-between  px-3 py-2 cursor-pointer rounded-lg m-2 transition-all hover:opacity-80 border border-black ${selected?"bg-green-100":"bg-violet-100"}  `}>
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          className={`w-6 h-6 border-2 border-black rounded-sm cursor-pointer flex justify-center items-center ${selected ? "bg-blue-500" : ""}`}>
          {selected ? <FaCheck size={20} /> : ""}
        </button>
        <span className="text-xs font-mono font-semibold text-gray-400 shrink-0">
          {course["Course Code"]}
        </span>
        <span className="text-sm font-medium text-black truncate min-w-0">
          {course["Course Name"]}
        </span>
      </div>
    </li>
  );
};