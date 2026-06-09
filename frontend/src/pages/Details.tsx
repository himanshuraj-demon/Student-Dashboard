import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import CreditBreakdownChart from "../components/CreditBreakdown";
import SemesterTrendChart from "../components/Semester";
import Mandatory from "../components/Mandatory";
import CurriculumTable from "../components/CurriculumTable";
import {
  curriculumPathway1,
  Chemical,
  Civil,
  ComputerScience,
  Electrical,
  Mechanical,
  Materials,
} from "../../constants/semesterplan";

const Branch: string[] = [
  "Artificial Intelligence",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science & Engineering",
  "Electrical Engineering",
  "Materials Engineering",
  "Mechanical Engineering",
];

const curriculumMap = {
  "Artificial Intelligence": curriculumPathway1,
  "Chemical Engineering": Chemical,
  "Civil Engineering": Civil,
  "Computer Science & Engineering": ComputerScience,
  "Electrical Engineering": Electrical,
  "Materials Engineering": Materials,
  "Mechanical Engineering": Mechanical,
};

const Details = () => {
  useTitle("Details");
  const [selectedBranch, setSelectedBranch] = useState(
    "Computer Science & Engineering",
  );
  return (
    <div className="main">
      <Nav />
      <div className="detailsmainbox overflow-x-hidden relative md:w-full w-dvw  flex flex-col h-dvh ">
        <h1 className="font-semibold text-4xl self-center m-5 md:absolute md:right-3 text-center w-dvw md:w-auto">
          Academic Details
        </h1>
        <div className="relative md:top-20 mt-5 md:mt-0">
          <div>
            <CreditBreakdownChart />
          </div>
          <div className="mr-5">
            <SemesterTrendChart />
          </div>
          <div>
            <Mandatory />
          </div>
          <div>
            <h1 className="text-center font-semibold bg-white text-black mx-5 rounded-4xl py-1 my-3">
              Academic Plan, UG Curriculum (Institute Level - Plan )
            </h1>
            <CurriculumTable curriculum={curriculumPathway1} />
          </div>
          <div className="flex flex-wrap gap-2 justify-center my-4">
            {Branch.map((branch) => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedBranch === branch
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {branch}
              </button>
            ))}
          </div>
          <div>
            <h1 className="text-center font-semibold bg-white text-black mx-5 rounded-4xl py-1 my-3">
              {selectedBranch} Curriculum
            </h1>

            <CurriculumTable
              curriculum={
                curriculumMap[selectedBranch as keyof typeof curriculumMap]
              }
            />
          </div>
          <div className="text-center  flex justify-between">
            <a href="./pdfs/Adv13_Norms for BTech Programme_28 Jan 2026.pdf" target="_blank" className="bg-blue-600 m-5 w-40 p-2 text-white rounded-2xl font-semibold">Know More</a>
            <a href="./pdfs/Adv13_Norms for BTech Programme_28 Jan 2026.pdf" download={true} className="bg-blue-600 m-5 w-40 p-2 text-white rounded-2xl font-semibold">Download</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
