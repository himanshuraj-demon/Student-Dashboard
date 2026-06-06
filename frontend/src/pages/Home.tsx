import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className='main'>
    <Navbar/>
    <div className='flex-1 w-auto'>Home
    <div className='bg-white h-dvh text-black'>hi</div>
    <div className='bg-red-500 h-dvh text-white'>hello</div>
    </div>
    </div>
  )
}

export default Home