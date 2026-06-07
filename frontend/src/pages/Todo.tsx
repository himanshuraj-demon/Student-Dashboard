import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav';

const Todo = () => {
  useTitle("Todo");
  return (
    <div className='main'>
      <Nav/>
      Todo
    </div>
  )
}

export default Todo