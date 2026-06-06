import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Competitive = () => {
    useTitle("Competitive")
  return (
    <div className='main'>
      <Navbar/>
      Competitive
    </div>
  )
}

export default Competitive
