import React, { useEffect } from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav'

const Profile = () => {
  useTitle("Profile")
  return (
    <div className='main'>
      <Nav/>
      Profile
    </div>
  )
}

export default Profile