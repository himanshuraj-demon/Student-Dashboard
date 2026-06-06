import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useTitle } from '../hooks/useTitle';

const Timetable = () => {
    const [cources,setCources]=useState([]);
    useTitle("Timetable");
  return (
    <div className='main'>
      <Navbar/>
      Timetable
    </div>
  )
}

export default Timetable