import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Analytics = () => {
  useTitle("Analytics")
  return (
    <div className='main'>
      <Nav/>
      analytics
    </div>
  )
}

export default Analytics
