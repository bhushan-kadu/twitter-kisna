import React from 'react'
import { TiHome } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constants';
import toast from 'react-hot-toast';
import { followingUpdate, getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

function LeftSideBar() {
    const {user,profile}=useSelector(store=>store.user)
    const navigate =useNavigate()
    const dispatch =useDispatch()

    const logoutHandler= async()=>{
        try {
            const res =await axios.get(`${USER_API_ENDPOINT}/logout`,{
                withCredentials:true
            })
            dispatch(getUser(null))
            dispatch(getOtherUsers(null))
            dispatch(getMyProfile(null))
            
            navigate('/login')
            console.log(res)
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
            console.log(error);
        }

    }
    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img className='ml-4'width={"45px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZp6B9XkapKS-qVpXeYciq4Hk1cihbYBPIytizVatbcebpzClS6v8jOA52oKAaEH1PBM&usqp=CAU" alt="appLogo" />
                </div>
                <div className='my-4'>
                    <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><TiHome size={"24px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Home</h1>
                    </Link>

                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><FaSearch size={"22px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Explore</h1>
                    </div>

                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><IoMdNotifications size={"25px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Notification</h1>
                    </div>

                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><IoMail size={"24px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Message</h1>
                    </div>

                    <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><FaUser size={"22px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Profile</h1>
                    </Link>

                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><FaHeart size={"22px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Favriote</h1>
                    </div>

                    <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <div><LuLogOut size={"24px"} /></div>
                        <h1 className='font-bold text-lg ml-2'> Logout</h1>
                    </div>

                    <div>
                        <button className='px-4 py-2 border-none text-md bg-[#1098f0] w-full text-white font-bold rounded-full'>Post</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default LeftSideBar
