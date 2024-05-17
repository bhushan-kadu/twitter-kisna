import React from 'react'
import {BrowserRouter,Routes,Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Feed from './Feed'
import Profile from './Profile'
function Body() {
    const appRouter=createBrowserRouter([
        {
            path:'/',
            element:<Home/>,
            children:[
                {
                    path:'/',
                    element:<Feed/>
                },
                {
                    path:'/profile/:id',
                    element:<Profile/>
                }
            ]
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
    ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
