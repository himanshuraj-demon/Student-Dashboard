import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useTitle } from '../hooks/useTitle'

const Profile = () => {
  useTitle("Profile")
  return (
    <div className='main'>
      <Navbar/>
      Profile
    </div>
  )
}

export default Profile