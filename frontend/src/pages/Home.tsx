import React, { useState } from 'react'
import Nav from '../components/homecomponnts/Nav';
import DarkVeil from '../components/DarkVeil';
const Home = () => {
  const [count ,setCount]=useState(0);
  return (
    <div>
      <Nav/>
      
    </div>
  )
}

export default Home