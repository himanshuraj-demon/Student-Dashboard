import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav';

const Calender = () => {
  useTitle("Calender");
  return (
    <div className='main'>
      <Nav/>
      Calender
    </div>
  )
}

export default Calender
