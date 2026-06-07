import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav';

const Notes = () => {
  useTitle("Notes");
  return (
    <div className='main'>
      <Nav/>
      Notes
    </div>
  )
}

export default Notes