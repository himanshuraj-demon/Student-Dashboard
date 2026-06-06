import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Cources = () => {
  useTitle("Cources")
  return (
    <div className='main'>
      <Navbar/>
      Cources
    </div>
  )
}

export default Cources
