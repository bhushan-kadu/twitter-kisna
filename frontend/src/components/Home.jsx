import React, { useEffect } from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import store from '../redux/store'
import useGetMyTweet from '../hooks/useGetMyTweet'


function Home() {
  const {user,otherUsers}=useSelector(store=>store.user)
  const navigate =useNavigate()

  useOtherUsers(user?._id)
  useGetMyTweet(user?._id)
  
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
    <LeftSideBar/>
    <Outlet/>
    <RightSideBar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
