import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { FiCamera } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile';
import { userDataContext } from '../context/UserContext';
import profile from "../assets/profile.jpeg"
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

const Profile = () => {
    let {userData,setUserData,edit,setEdit}=useContext(userDataContext)
 let {serverUrl}=useContext(authDataContext)

    let [userConnection,setUserConnection]=useState([])

    const handleGetUserConnection=async()=>{

        try{
            let result =await axios.get(`${serverUrl}/api/connection`,{withCredentials:true})
            console.log(result.data)
            setUserConnection(result.data)
           
        }
        catch(error){
            console.log(error)

        }
    }

    useEffect(()=>{
        handleGetUserConnection()
    },[])
  return (

    <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col 
    items-center pt-[100px] '>

        <NavBar />
        {edit &&
        <EditProfile />}
      
      <div className='w-full max-w-[900px] bg-white min-h-[100vh] '>

      <div className='relative bg-[white] pb-[40px] rounded  shadow-lg'>

        <div
                  className="w-full h-[100px] bg-gray-400 rounded p-[20px] overflow-hidden flex items-center justify-center relative cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  <img src={userData.coverImage || null} alt="" className="w-full" />
                  <FiCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer" />
                </div>
        
                <div
                  className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor-pointer"
                  onClick={() => setEdit(true)}
                >
                  <img
                    src={userData.profileImage || profile}
                    alt=""
                    className="h-full"
                  />
                </div>
        
                <div className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center items-center">
                  <TiPlus className="text-white" />
                </div>
        
                <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
                  <div className="text-[22px]">{`${userData?.firstName || ""} ${
                    userData?.lastName || ""
                  }`}</div>
                  <div className="text-[18px] font-semibold text-gray-600">
                    {userData?.headline || " "}
                  </div>
                  <div className="text-[16px] text-gray-500">
                    {userData?.location || " "}
                  </div>
                  <div className="text-[16px] text-gray-500">
                    {`${userData.connection.length} Connection`}
                  </div>
                </div>
        
                <button
                  className="min-w-[150px] h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]
                   flex items-center justify-center gap-[10px] ml-[20px] "
                  onClick={() => setEdit(true)}
                >
                  Edit Profile <HiPencil />
                </button>
              </div>
        

     




      </div>
    </div>
  )
}

export default Profile
