import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Dashbord = () => {
  useTitle("Dashboard")
  return (
    <div className='main'>
      <Navbar/>
      Dashbord
    </div>
  )
}

export default Dashbord