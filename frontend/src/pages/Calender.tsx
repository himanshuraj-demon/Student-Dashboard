import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Calender = () => {
  useTitle("Calender");
  return (
    <div className='main'>
      <Navbar/>
      Calender
    </div>
  )
}

export default Calender
