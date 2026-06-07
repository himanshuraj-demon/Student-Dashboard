import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Cources = () => {
  useTitle("Cources")
  return (
    <div className='main'>
      <Nav/>
      Cources
    </div>
  )
}

export default Cources
