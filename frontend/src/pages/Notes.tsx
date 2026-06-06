import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Notes = () => {
  useTitle("Notes");
  return (
    <div className='main'>
      <Navbar/>
      Notes
    </div>
  )
}

export default Notes