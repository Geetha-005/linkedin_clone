import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import NavBar from '../components/NavBar'
import axios from "axios"
import profile from "../assets/profile.jpeg"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { RxCrossCircled } from "react-icons/rx";

const Network = () => {

    let {serverUrl}=useContext(authDataContext)
  let [connections,setConnections]=useState([])


  const handleGetRequests=async()=>{
   
    try{
        let result =await axios.get(`${serverUrl}/api/connection/requests`,{withCredentials:true})
        console.log("API Response:", result.data);
        setConnections(result.data.requests)
    }
    catch(error){
        console.log(error)
        

    }
  }

  const handleAcceptConnection=async(requestId)=>{

    try{
        let result=await axios.put(`${serverUrl}/api/connection/accept/${requestId}`,{},{withCredentials:true})
      console.log(result)
      setConnections(connections.filter((con)=>con.id==requestId))
    }
    catch(error){
        console.log(error)

    }
  }

  const handleRejectConnection=async(requestId)=>{

    try{
        let result=await axios.put(`${serverUrl}/api/connection/rejected/${requestId}`,{},{withCredentials:true})
      console.log(result)
      setConnections(connections.filter((con)=>con.id==requestId))
    }
    catch(error){
        console.log(error)

    }
  }

  useEffect(()=>{
    handleGetRequests()
  },[])

  return (
    <div className='w-screen h-[100vh] bg-[#f0efe7] pt-[100px] px-[20px]
     flex flex-col gap-[40px] items-center '>
      <NavBar />

      <div className='w-full h-[100px] bg-[white] shadow-lg rounded-lg items-center flex p-[10px] text-[22px]
      text-gray-600'>
     Invitations: {connections.length}
      </div>
      {connections.length >0 &&
      <div className='w-full max-w-[60%] shadow-lg rounded-lg flex flex-col gap-[20px] min-h-[100px]'>
        {connections.map((connection,index)=>(
            <div key={index} className='w-full min-h-[100px] p-[20px] flex justify-between items-center'>
                {/* {connection.sender.firstName} */}
                <div className='flex justify-center items-center gap-[10px]'>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'>
                        <img src={connection.sender.profileImage || profile} alt="" className='w-full h-full'/>
                    </div >

                    
                    <div className='text-[19px] font-semibold text-gray-700'>
              {`${connection.sender.firstName} ${connection.sender.lastName}`}
            </div>
                    


                </div>

                <div className='flex justify-center items-center gap-[10px]'>

           <button className='text-[#18c5ff] font-semibold'
           onClick={()=>handleAcceptConnection(connection._id)}>
           <IoIosCheckmarkCircleOutline className='w-[40px] h-[40px]' />
           </button>
           <button className='text-[#ff4218] font-semibold'
           onClick={()=>handleRejectConnection(connection._id)}>
            <RxCrossCircled className='w-[37px] h-[37px]' />
            </button>
           
                </div>
                </div>
        ))}
      </div>}

    </div>
  )
}

export default Network
