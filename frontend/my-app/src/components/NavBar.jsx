
import React, { useContext, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import profile from "../assets/profile.jpeg";
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo2 from "../assets/logo2.png"; // Ensure you have this logo image

const NavBar = () => {
  let [activeSearch, setActiveSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);

  let { userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-[80px] bg-white fixed top-0 shadow-lg flex justify-between md:justify-around 
    items-center px-[10px] left-0 z-[80]'>
      {/* Left side navbar */}
      <div className='flex justify-center items-center gap-[10px]'>
        <div onClick={() => {setActiveSearch(false)
          navigate("/")
        }
        }>
          <img src={logo2} alt="Logo" className='w-[50px]' />
        </div>

        {!activeSearch &&
          <IoSearch
            className='w-[23px] h-[23px] text-gray-600 lg:hidden cursor-pointer'
            onClick={() => setActiveSearch(true)}
          />
        }

        <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f3f2ec] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch ? "hidden" : "flex"}`}>
          <IoSearch className='w-[23px] h-[23px] text-gray-600' />
          <input type='text' placeholder='search users...' className='w-[80%] h-full bg-transparent outline-none border-0' />
        </form>
      </div>

      {/* Right side navbar */}
      <div className='flex items-center justify-center gap-[20px] relative'>
        {showProfile &&
          <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] right-0 rounded-lg items-center flex flex-col p-[20px] gap-[20px] z-50'>
            <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
              <img src={userData.profileImage||profile} alt="Profile" className='w-full h-full' />
            </div>

            <div className='text-[19px] font-semibold text-gray-700'>
              {`${userData.firstName} ${userData.lastName}`}
            </div>

            <button className='w-full h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]'
            onClick={()=>navigate("/profile")}>View Profile</button>

            <div className='w-full h-[1px] bg-gray-300'></div>

            <div className='flex w-full gap-[10px] items-center justify-start text-gray-600' 
            >
              <FaUsers className='w-[23px] h-[23px] text-gray-600'  />
              <div>My Network</div>
            </div>

            <button onClick={handleSignOut} className='w-full h-[40px] rounded-full border-2 border-[#ec4545] text-[#ec4545]'>Sign Out</button>
          </div>
        }

        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
          <MdHome className='w-[23px] h-[23px]' />
          <div>Home</div>
        </div>

        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer' onClick={()=>navigate("/network")}>
          <FaUsers className='w-[23px] h-[23px]' />
          <div>My Network</div>
        </div>

        <div className='flex flex-col items-center justify-center text-gray-600'>
          <IoIosNotifications className='w-[23px] h-[23px] sm:hidden' />
          <div className='hidden md:block'>Notification</div>
        </div>

        <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer' onClick={() => setShowProfile(!showProfile)}>
          <img src={userData.profileImage||profile} alt="User" className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;






























// <<<<<<< HEAD
// import React, { useContext, useState } from 'react'
// =======
// import React, { useState } from 'react'
// >>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
// import logo2 from '../assets/logo2.png'
// import { IoSearch } from "react-icons/io5";
// import { MdHome } from "react-icons/md";
// import { FaUsers } from "react-icons/fa6";
// import { IoIosNotifications } from "react-icons/io";
// import profile from "../assets/profile.jpeg"
// <<<<<<< HEAD
// import { userDataContext } from '../context/UserContext';
// import { authDataContext } from '../context/AuthContext';
// import {useNavigate} from "react-router-dom"
// import axios from "axios"



// const NavBar = () => {
//     let [activeSearch,setActiveSearch]=useState(false)
//     let[showProfile,setShowProfile]=useState(false)
//     // let[showPop,setShowpop]=useState(false)
//     let {userData,setUserData}=useContext(userDataContext)
//     let {serverUrl}=useContext(authDataContext)
//    let navigate=useNavigate()
//     const handleSignOut=async()=>{
//       try{
//         let result=await axios.get(serverUrl+"/api/auth/logout",{
//           withCredentials:true
//         })
//         setUserData(null)
//         navigate("/login")
//         console.log(result)
//       }
//       catch(error){
//         console.log(error)

//       }
//     }






//   return (
//     <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between 
//      md:justify-around items-center px-[10px]'>

//       {/* left side navbar */}


// =======

// const NavBar = () => {
//     let [activeSearch,setActiveSearch]=useState(false)
//   return (
//     <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between 
//      md:justify-around items-center px-[10px]'>
// >>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
//         <div className='flex justify-center items-center gap-[10px]'>
//         <div onClick={()=>setActiveSearch(false)}>
//        <img src={logo2} alt=""  className='w-[50px]'/>
//        </div>
//        {!activeSearch && 
//        <div>
//         <IoSearch className='w-[23px] h-[23px] text-gray-600 lg:hidden '
//         onClick={()=>setActiveSearch(true)}/>
//         </div>}

//        <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f3f2ec] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md 
//        ${!activeSearch ?"hidden":"flex"}`}>
//         <div>
//         <IoSearch className='w-[23px] h-[23px] text-gray-600'/>
//         </div>
//         <input type='text' placeholder='search users...' className='w-[80%] h-full bg-transparent outline-none border-0 '/>
       
//        </form>
//        </div>

// <<<<<<< HEAD
// {/* pop area */}
//        <div className='flex items-center justify-center gap-[20px] relative'>

//         {
//           showProfile  &&
        
//         <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg items-center 
//         flex flex-col p-[20px] gap-[20px]'>
//         <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
//          <img src={profile} alt= "" className='w-full h-full' />
//         </div>
          
//           <div className='text-[19px] font-semibold text-gray-700 '>
//             {`${userData.firstName} ${userData.lastName}`}
//           </div>
//           <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]'>View Profile</button>
//          <div className='w-full h-[1px] bg-gray-700'></div>
//          <div className='flex  w-full gap-[10px] items-center justify-start text-gray-600 '>
//         <FaUsers className='w-[23px] h-[23px] text-gray-600' />
//         <div>My Network</div>
//         </div>
//         <button onClick={handleSignOut} className='w-[100%] h-[40px] rounded-full border-2 border-[#ec4545] text-[#ec4545s]'>Sign Out</button>
       
         
      
//         </div>
        

//         }
// =======

//        <div className='flex items-center justify-center gap-[20px] relative'>
//         <div className='w-[300px] h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg'>

//         </div>
// >>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880




// <<<<<<< HEAD
//        {/* right side navbar  */}
// =======




// >>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
//         <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden' >
//         <MdHome  className='w-[23px] h-[23px] text-gray-600' />
//         <div>Home</div>
//         </div>
//         <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
//         <FaUsers className='w-[23px] h-[23px] text-gray-600' />
//         <div>My Network</div>
//         </div>
//         <div className='flex flex-col items-center justify-center text-gray-600'>
//         <IoIosNotifications className='w-[23px] h-[23px] text-gray-600 sm:hidden' />
//         <div className='hidden md:block'>Notification</div>
//         </div>
// <<<<<<< HEAD

//         <div className='w-[50px] h-[50px] rounded-full overflow-hidden' onClick={()=>setShowProfile(!showProfile)}>
// =======
//         <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
// >>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
//          <img src={profile} alt= "" className='w-full h-full' />
//         </div>
//        </div>
//     </div>
//   )
// }

// export default NavBar
