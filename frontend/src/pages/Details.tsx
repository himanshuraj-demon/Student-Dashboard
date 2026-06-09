import React from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import CreditBreakdownChart from "../components/CreditBreakdown";
import SemesterTrendChart from "../components/Semester";
import Mandatory from "../components/Mandatory";


const Details = () => {
  useTitle("Details");
  return (
    <div className="main">
      <Nav />
      <div className="detailsmainbox overflow-x-hidden relative md:w-full w-dvw  flex flex-col h-dvh ">
        <h1 className="font-semibold text-4xl self-center m-5 md:absolute md:right-3 text-center w-dvw md:w-auto">
          Academic Details
        </h1>
        <div className="relative md:top-20 mt-5 md:mt-0">
            <div><CreditBreakdownChart/></div>
        <div className="mr-5">
            <SemesterTrendChart/>
        </div>
        <div>
            <Mandatory/>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Details;
