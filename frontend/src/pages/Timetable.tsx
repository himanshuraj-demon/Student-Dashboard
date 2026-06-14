import React, { useEffect, useState } from 'react'
import { useTitle } from '../hooks/useTitle';
import Nav from '../services/Nav';
import TimeTableAdd from '../components/TimeTableAdd';
import TimeTableGenerator from '../components/TimeTableGenerator';
import { type CourseEntry } from '../../constants/timetabletypes';
import { SlCalender } from "react-icons/sl";

const COURSES: CourseEntry[] = [
  { "Course Code": "FP 100", "Course Name": "Foundation Programme" },
  {
    "Course Code": "ES 101",
    "Course Name": "Engineering Graphics",
    Lecture: "A2\n (Jasubhai Auditorium)",
    Lab: "N1,N2 (1/101,1/102,7/108,7/109)",
  },
  {
    "Course Code": "ES 112",
    "Course Name": "Computing",
    Lecture: "F1,F2\n (Jasubhai Auditorium)",
    Lab: "P1,P2\n (10/104,10/105)",
  },
  {
    "Course Code": "MA 101",
    "Course Name": "Mathematics I",
    Lecture: "B1,B2\n (Jasubhai Auditorium)",
    Lab: "H1,H2 (2/201,2/202)",
  },
  {
    "Course Code": "PH 101",
    "Course Name": "Physics",
    Lecture: "C1,C2\n (Block 3)",
    Lab: "G1,G2 (3/301,3/302)",
  },
  {
    "Course Code": "CH 101",
    "Course Name": "Chemistry",
    Lecture: "D1,D2\n (Block 4)",
    Lab: "I1,I2 (4/401,4/402)",
  },
  {
    "Course Code": "HS 101",
    "Course Name": "Communication Skills",
    Lecture: "E1,E2\n (Block 5)",
    Lab: "J1,J2 (5/501,5/502)",
  },
  {
    "Course Code": "ME 101",
    "Course Name": "Workshop",
    Lecture: "K1,K2\n (Workshop Block)",
    Lab: "L1,L2 (W/101,W/102)",
  },
  {
    "Course Code": "CE 101",
    "Course Name": "Engineering Mechanics",
    Lecture: "M1,M2\n (Block 6)",
  },
];



const Timetable = () => {
    const [cources,setCources]=useState<CourseEntry[]>([]);
    const [addedCourses,setAddedCourses]=useState([]);
    const [isAdding,setAdding]=useState(false);
    useTitle("Timetable");
    useEffect(()=>{
         setCources(COURSES);
    },[cources])



  return (
    <div className='main'>
      <Nav/>
      <div className='flex w-dvw md:w-auto flex-col h-fit md:h-dvh overflow-y-scroll overflow-x-hidden '>
        <div className='flex justify-center gap-2 items-center m-2 mb-0 p-2 bg-[#ffffff22] rounded-2xl h-20'>
          <SlCalender size={30}/>
            <h1 className='text-3xl font-semibold'>Generate TimeTable</h1>
        </div>

        {!isAdding?<TimeTableGenerator courses={cources} setAdding={setAdding}/>:<TimeTableAdd/>}
      </div>
    </div>
  )
}

export default Timetable