import React, { useState } from 'react'
import { useTitle } from '../hooks/useTitle';
import Nav from '../services/Nav';

const Timetable = () => {
    const [cources,setCources]=useState([]);
    useTitle("Timetable");
  return (
    <div className='main'>
      <Nav/>
      Timetable
    </div>
  )
}

export default Timetable