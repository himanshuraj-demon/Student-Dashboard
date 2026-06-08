import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Details = () => {
  useTitle("Details")
  return (
    <div className='main'>
      <Nav/>
      details
    </div>
  )
}

export default Details;
