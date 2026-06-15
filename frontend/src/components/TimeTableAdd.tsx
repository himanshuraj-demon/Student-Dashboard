import React, { useState, useMemo } from "react";
import { TimeTableRows } from "./TimeTableRows";
import { type CourseEntry } from "../../constants/timetabletypes";
import { FiSearch, FiX } from "react-icons/fi";
import { COURSES } from "../../constants/timetabledata";
import { IoClose } from "react-icons/io5";

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

  return (
    <div className="flex mt-5 flex-col items-center">
      <div className="flex justify-center mx-5 mb-4">
        <button
          className="bg-blue-600 text-white rounded-2xl p-2 px-4"
          onClick={() => setAdding(false)}>
          Generate TimeTable
        </button>
      </div>

      {cources.length > 0 &&
       <div>
        <ul className="flex flex-wrap gap-2 border border-white rounded-2xl p-3 m-2">
          {cources.map((c)=>(
            <li className="bg-green-100 text-black px-3 py-1 rounded-2xl flex items-center" onClick={()=>handleToggle(c)}>{c["Course Code"]}<IoClose size={20}/> </li>
          ))}
        </ul>
        </div>}

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
            className="w-full bg-[#ffffff18] text-white placeholder-gray-400 text-sm rounded-xl pl-9 pr-9 py-2 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors"
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
