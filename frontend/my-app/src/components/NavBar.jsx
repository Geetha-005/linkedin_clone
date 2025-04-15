import React, { useState } from 'react'
import logo2 from '../assets/logo2.png'
import { IoSearch } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import profile from "../assets/profile.jpeg"

const NavBar = () => {
    let [activeSearch,setActiveSearch]=useState(false)
  return (
    <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between 
     md:justify-around items-center px-[10px]'>
        <div className='flex justify-center items-center gap-[10px]'>
        <div onClick={()=>setActiveSearch(false)}>
       <img src={logo2} alt=""  className='w-[50px]'/>
       </div>
       {!activeSearch && 
       <div>
        <IoSearch className='w-[23px] h-[23px] text-gray-600 lg:hidden '
        onClick={()=>setActiveSearch(true)}/>
        </div>}

       <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f3f2ec] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md 
       ${!activeSearch ?"hidden":"flex"}`}>
        <div>
        <IoSearch className='w-[23px] h-[23px] text-gray-600'/>
        </div>
        <input type='text' placeholder='search users...' className='w-[80%] h-full bg-transparent outline-none border-0 '/>
       
       </form>
       </div>


       <div className='flex items-center justify-center gap-[20px] relative'>
        <div className='w-[300px] h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg'>

        </div>








        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden' >
        <MdHome  className='w-[23px] h-[23px] text-gray-600' />
        <div>Home</div>
        </div>
        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
        <FaUsers className='w-[23px] h-[23px] text-gray-600' />
        <div>My Network</div>
        </div>
        <div className='flex flex-col items-center justify-center text-gray-600'>
        <IoIosNotifications className='w-[23px] h-[23px] text-gray-600 sm:hidden' />
        <div className='hidden md:block'>Notification</div>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
         <img src={profile} alt= "" className='w-full h-full' />
        </div>
       </div>
    </div>
  )
}

export default NavBar
