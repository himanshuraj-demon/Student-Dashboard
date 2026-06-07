import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Competitive = () => {
    useTitle("Competitive")
  return (
    <div className='main'>
      <Nav/>
      Competitive
    </div>
  )
}

export default Competitive
