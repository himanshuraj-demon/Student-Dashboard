import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Dashbord = () => {
  useTitle("Dashboard")
  return (
    <div className='main'>
      <Nav/>
      Dashbord
    </div>
  )
}

export default Dashbord