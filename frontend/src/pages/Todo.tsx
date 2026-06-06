import React from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Todo = () => {
  useTitle("Todo");
  return (
    <div className='main'>
      <Navbar/>
      Todo
    </div>
  )
}

export default Todo