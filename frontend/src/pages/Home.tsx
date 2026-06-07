import React, { useState } from 'react'
import Nav from '../services/Nav'

const Home = () => {
  const [count ,setCount]=useState(0);
  return (
    <div className='main'>
    <Nav/>
    <div className='flex-1 w-auto'>{count}
      <button onClick={()=>setCount(count=>count+1)}>click</button>
    <div className='bg-white h-dvh text-black'>
    </div>
    <div className='bg-red-500 h-dvh text-white'>hello</div>
    </div>
    </div>
  )
}

export default Home