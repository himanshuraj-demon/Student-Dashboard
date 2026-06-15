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
        <div className="flex justify-center items-center m-4 mb-0 p-2 bg-[#ffffff22] rounded-2xl h-20 flex-col">
            <h1 className="text-base md:text-3xl font-bold text-center">IIT Gandhinagar Academic Details & Degree Requirements</h1>
            <p className="md:flex hidden">
              View degree requirements, credit distribution, semester-wise
              progress, and graduation requirements for IIT Gandhinagar
              students.
            </p>
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
