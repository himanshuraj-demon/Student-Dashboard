import React, { useState, useMemo } from "react";
import { TimeTableRows } from "./TimeTableRows";
import { type CourseEntry } from "../../../constants/timetabletypes";
import { FiSearch, FiX } from "react-icons/fi";
import { COURSES } from "../../../constants/timetabledata";
import { IoClose } from "react-icons/io5";
import { COURSE_CREDITS } from "../../../constants/coursecredits";

type TimeTableProp = {
  cources: CourseEntry[];
  setCources: React.Dispatch<React.SetStateAction<CourseEntry[]>>;
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimeTableAdd: React.FC<TimeTableProp> = ({
  cources,
  setCources,
  setAdding,
}) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COURSES;
    return COURSES.filter(
      (c) =>
        c["Course Name"]?.toLowerCase().includes(q) ||
        c["Course Code"].toLowerCase().includes(q),
    );
  }, [query]);

  const handleToggle = (course: CourseEntry) => {
    setCources((prev) => {
      return prev.filter((c) => c["Course Code"] !== course["Course Code"]);
    });
  };

  const totalCredits = useMemo(() => {
    return cources.reduce((sum, c) => sum + (COURSE_CREDITS[c["Course Code"]] ?? 3), 0);
  }, [cources]);

  return (
    <div className="flex mt-5 flex-col items-center">
      <div className="flex justify-center items-center gap-4 mx-5 mb-4 flex-wrap">
        <button
          className="bg-blue-600 text-white rounded-2xl p-1 px-3 cursor-pointer hover:bg-blue-700 transition-all font-semibold"
          onClick={() => setAdding(false)}>
          Generate TimeTable
        </button>
        <span className="text-sm font-semibold px-3 py-1 bg-white/10 rounded-xl border border-white/20">
          Total Selected Credits: <span className="text-blue-400 font-extrabold">{totalCredits}</span>
        </span>
      </div>

      {cources.length > 0 && (
        <div>
          <ul className="flex flex-wrap gap-2 border border-white rounded-2xl p-3 m-2">
            {cources.map((c) => (
              <li
                className="bg-green-100 text-black px-3 py-1 rounded-2xl flex items-center cursor-pointer"
                onClick={() => handleToggle(c)}>
                {c["Course Code"]}
                <IoClose size={20} />{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="md:w-[90%] w-dvw border border-white rounded-2xl p-3 bg-[#ffffff11]">
        <div className="relative mb-3">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by course name or code…"
            className="w-full bg-[#ffffff18]  placeholder-gray-400 text-sm rounded-xl pl-9 pr-9 py-2 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              <FiX size={15} />
            </button>
          )}
        </div>

        <ul className="list-none p-0 m-0">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <TimeTableRows
                key={c["Course Code"]}
                cources={cources}
                setCources={setCources}
                course={c}
              />
            ))
          ) : (
            <li className="text-center text-gray-400 text-sm py-6">
              No courses match "{query}"
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TimeTableAdd;
