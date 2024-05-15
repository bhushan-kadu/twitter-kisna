import React from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
import { Outlet } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import store from '../redux/store'


function Home() {
  const {user,otherUsers}=useSelector(store=>store.user)
  useOtherUsers(user?._id)
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
    <LeftSideBar/>
    <Outlet/>
    <RightSideBar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
