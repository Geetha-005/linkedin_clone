
import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import profile from "../assets/profile.jpeg"
import { TiPlus } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { userDataContext } from '../context/UserContext';
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile';

const Home = () => {
  let { userData, setUserData, setEdit, edit } = useContext(userDataContext)

  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row'>
      
      {edit && <EditProfile />}

      <NavBar />

      {/* Left Profile Card */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px] relative'>
        <div 
          className='w-full h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer' 
          onClick={() => setEdit(true)}
        >
          <img src="" alt="" className='w-full' />
          <FiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer' />
        </div>

        <div 
          className='w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute top-[65px] left-[35px] cursor-pointer' 
          onClick={() => setEdit(true)}
        >
          <img src={profile} alt="" className='h-full' />
        </div>

        <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center items-center'>
          <TiPlus className='text-white' />
        </div>

        <div className='mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700'>
          <div>{`${userData?.firstName || ""} ${userData?.lastName || ""}`}</div>
          <div className='text-[19px] font-semibold text-gray-700'>{userData?.headline || " "}</div>
          <div className='text-[16px] text-gray-500'>{userData?.location || " "}</div>
        </div>

        <button 
          className='w-full h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]' 
          onClick={() => setEdit(true)}
        >
          Edit Profile <HiPencil />
        </button>
      </div>

      {/* Middle Section */}
      <div className='w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg'>
        {/* Add your feed/posts here */}
      </div>

      {/* Right Section */}
      <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg'>
        {/* Add widgets/ads or suggestions here */}
      </div>
    </div>
  )
}

export default Home




// import React, { useContext, useState } from 'react'
// import NavBar from '../components/NavBar'
// import profile from "../assets/profile.jpeg"
// import { TiPlus } from "react-icons/ti";
// import { FiCamera } from "react-icons/fi";
// import { userDataContext } from '../context/UserContext';
// import { HiPencil } from "react-icons/hi2";
// import EditProfile from '../components/EditProfile';



// const Home = () => {

//   let{userData,setUserData,setEdit,edit}=useContext(userDataContext)
  

//   return (

//     <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] 
//     px-[20px] flex-col lg:flex-row'>

//       {edit &&  <EditProfile  />}
//         <NavBar />

       

//         <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative ' >
//           <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center
//           relative  cursor-pointer' onClick={()=>setEdit(true)}>

//             <img src="" alt="" className='w-full'/>
//             <FiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer'/>

//            </div>
//            <div className='w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute
//             top-[65px] left-[35px]  cursor-pointer' onClick={()=>setEdit(true)}>
//                     <img src={profile} alt= "" className=' h-full' />
                
//                     </div>

//                     <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px] left-[90px] rounded-full flex justify-center
//                     items-center '>
//                     <TiPlus  className='text-white '/>
//             </div>

//             <div className='mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700'>
//               <div>{`${userData.firstName} ${userData.lastName}`}</div>
//               <div className='text-[19px] font-semibold text-gray-700'>{userData.headline||" "}</div>
//               <div className='text-[16px]  text-gray-500'>{userData.location}</div>

//               </div>

//               <button className='w-[100%] h-[40px] my-[30px]  rounded-full border-2 border-[#2dc0ff]
//                text-[#2dc0ff] flex items-center justify-center gap-[10px] ' onClick={()=>setEdit(true)}>Edit  Profile  <HiPencil /></button>
        
            

//         </div>

//         <div className='w-full lg:w-[50%] min-h-[200px] bg-[white] shadow-lg'>


//         </div>


//         <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg'>


//         </div>


   
//   )
// }

// export default Home
