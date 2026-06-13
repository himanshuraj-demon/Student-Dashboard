import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav';


const Planner = () => {
  useTitle("Planer");
  return (
    <div className='main'>
      <Nav/>
      Planeer
    </div>
  )
}

export default Planner;
