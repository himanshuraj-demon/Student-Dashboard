import React from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import CreditBreakdownChart from "../components/CreditBreakdown";
import SemesterTrendChart from "../components/Semester";
import Mandatory from "../components/Mandatory";
import CurriculumTable from "../components/CurriculumTable";
import {
  curriculumPathway1,
} from "../../constants/semesterplan";


const Details = () => {
  useTitle("Details");
  return (
    <div className="main">
      <Nav />
      <div className="detailsmainbox overflow-x-hidden relative md:w-full w-dvw  flex flex-col h-dvh ">
        <div className="flex items-center justify-between mx-5 border-b-2 py-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Academic Details </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Degree requirements and semester credit analysis
            </p>
          </div>
        </div>
        <div className="relative md:top-10 mt-5 md:mt-0">
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
        </div>
      </div>
    </div>
  );
};

export default Details;
