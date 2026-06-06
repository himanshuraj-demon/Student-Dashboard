import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Analytics = () => {
  useTitle("Analytics")
  return (
    <div className='main'>
      <Navbar/>
      analytics
    </div>
  )
}

export default Analytics
