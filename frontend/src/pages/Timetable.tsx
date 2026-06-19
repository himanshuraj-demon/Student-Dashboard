import  { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import TimeTableAdd from "../components/TimeTableAdd";
import TimeTableGenerator from "../components/TimeTableGenerator";
import { type CourseEntry } from "../../constants/timetabletypes";
import { SlCalender } from "react-icons/sl";

const Timetable = () => {
  const [cources, setCources] = useState<CourseEntry[]>([]);
  const [isAdding, setAdding] = useState(true);
  useTitle("Timetable");

  return (
    <div className="main">
      <Nav />
      <div className="overflow-x-hidden relative md:w-auto w-dvw flex-1 flex flex-col h-dvh">
        <div className="flex justify-center items-center mt-3 m-2 mb-0 p-3 bg-[#ffffff22] rounded-2xl h-20 flex-col border border-gray-300">
          <h1 className="text-3xl font-semibold flex gap-2">
            <SlCalender size={30} /> Generate TimeTable
          </h1>
          <p className="md:flex hidden">
            Generate conflict-free IIT Gandhinagar timetables, compare
            schedules, and plan your semester efficiently.
          </p>
        </div>
        {isAdding ? (
          <TimeTableAdd
            cources={cources}
            setCources={setCources}
            setAdding={setAdding}
          />
        ) : (
          <TimeTableGenerator courses={cources} setAdding={setAdding} />
        )}
      </div>
    </div>
  );
};

export default Timetable;