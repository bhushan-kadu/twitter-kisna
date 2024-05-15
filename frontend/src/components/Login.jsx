import React, { useState } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constants'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/userSlice'
function Login() {
  const [isLogin,setIsLogin]=useState(true)
  const [firstName,setFirstName]=useState()
  const [lastName,setLastName]=useState()
  const [email,setEmail]=useState()
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const navigate =useNavigate()
  const dispatch=useDispatch()

  const submitHandler=async(e)=>{
    e.preventDefault();
    if(isLogin){
      //login
      try {
        const res=await axios.post(`${USER_API_ENDPOINT}/login`,{email,password},
        {
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        })
        dispatch(getUser(res?.data?.user))
        console.log(res);
        if(res.data.success){
          navigate("/")
          toast.success(res.data.msg)
        }
      } catch (error) {
        toast.error(error.response.data.msg)
        console.log(error);
      }
    }else{
      //register
      try {
        const res=await axios.post(`${USER_API_ENDPOINT}/register`,{firstName,lastName,email,username,password},
        {
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
          setIsLogin(true)
          toast.success(res.data.msg)
        }
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.msg)
        console.log(error);
      }
    }
  }
  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
        <img className='ml-4'width={"350px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZp6B9XkapKS-qVpXeYciq4Hk1cihbYBPIytizVatbcebpzClS6v8jOA52oKAaEH1PBM&usqp=CAU" alt="appLogo" />
        </div>
        <div >
         <div className='my-5'>
          <h1 className='font-bold text-5xl'>Happening Now!</h1>
         </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>
          {isLogin?"Login":"Register"}
          </h1>
          <form action="" className='flex flex-col w-[65%]' onSubmit={submitHandler}>
            {
              !isLogin &&(<>
                <input className ='outline-blue-400 border border-gray-800 px-4 py-2 my-1 rounded-full font-semibold' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} type="text" name="" id="" placeholder='First Name' />
                <input className ='outline-blue-400 border border-gray-800 px-4 py-2 my-1 rounded-full font-semibold' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder='Last Name'/>
                <input className ='outline-blue-400 border border-gray-800 px-4 py-2 my-1 rounded-full font-semibold' value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name="" id="" placeholder='usernmae' />      
            
              </>)
            }
          
          <input className ='outline-blue-400 border border-gray-800 px-4 py-2 my-1 rounded-full font-semibold' value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='email'/>
            <input className ='outline-blue-400 border border-gray-800 px-4 py-2 my-1 rounded-full font-semibold' value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password'/>

            <button className='bg-[#1098f8] border-none rounded-full py-2 my-4 text-lg text-white' >{isLogin?"Login":"Register"}</button>
            <h1 >{isLogin ?"Don't have an account?":"Already have an account?"} <span className=' font-bold text-blue-500 hover: cursor-pointer' onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Register":"Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
