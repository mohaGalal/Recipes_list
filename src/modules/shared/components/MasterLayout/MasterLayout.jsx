import React from 'react'
import Navbar from '../navbar/Navbar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../sideBar/Sidebar'


export default function  ({loginData}) {
  return (
    <div className='d-flex'>
      <div ><SideBar/></div>
      <div className='w-100 '>
        <Navbar loginData={loginData}/>
        <Outlet/>
      </div>

    </div>
  )
}
