import React from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import CreditBreakdownChart from "../components/CreditBreakdown";
import SemesterTrendChart from "../components/Semester";
import Mandatory from "../components/Mandatory";
import CurriculumTable from "../components/CurriculumTable";
import { curriculumPathway1 } from "../../constants/semesterplan";
import { useAuth } from "../hooks/useAuth";

const Details = () => {
  useTitle("Details");
  const { auth } = useAuth();
  return (
    <div className="main">
      {auth && <Nav />}
      <div className="detailsmainbox overflow-x-hidden relative md:w-full w-dvw  flex flex-col h-dvh ">
        <div className="flex items-center justify-between mx-5 border-b-2 py-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">IIT Gandhinagar Academic Details & Degree Requirements</h1>
            <p>
              View degree requirements, credit distribution, semester-wise
              progress, and graduation requirements for IIT Gandhinagar
              students.
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
            <h2 className="text-center font-semibold bg-white text-black mx-5 rounded-4xl py-1 my-3">
              Academic Plan, UG Curriculum (Institute Level - Plan )
            </h2>
            <CurriculumTable curriculum={curriculumPathway1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
