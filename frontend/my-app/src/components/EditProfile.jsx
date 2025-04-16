import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../context/UserContext";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";




const EditProfile = () => {
  let { edit, setEdit, userData, setUserData } = useContext(userDataContext);
  let [firstName,setFirstName]=useState(userData.firstName || "")
  let [lastName,setLastName]=useState(userData.lastName || "")
  let [userName,setUserName]=useState(userData.userName || "")
  let [heading,setHeading]=useState(userData.heading || "")
  let [location,setLocation]=useState(userData.location || "")
  let [gender,setGeneder]=useState(userData.gender || "")
  let [skills,setSkills]=useState(userData.skills|| [])
  let[newSkills,setNewSkills]=useState([])



  return (
    <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
      <div className="w-full h-full bg-black opacity-[0.5] absolute "></div>

      <div className="w-[90%] max-w-[500px] h-[600px] bg-white relative  overflow-auto z-[200] shadow-lg rounded-lg p-[10px] ">
        <div
          className="absolute top-[20px]  right-[20px] cursor-pointer "
          onClick={() => setEdit(false)}
        >
          <RxCross2
            className="w-[25px] h-[25px] text-gray-800
         font-bold"
          />
        </div>

        <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[20px] overflow-hidden">
          <img src="" alt="" className="w-full" />
           <FiCamera className='absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white  cursor-pointer'/>
          
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px]">
          <img src={profile} alt="" className="w-full h-full" />
        </div>
        <div
          className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[200px] left-[90px] rounded-full flex justify-center
                                    items-center "
        >
          <TiPlus className="text-white " />
        </div>

         <form  className="w-full flex flex-col items-center justify-center gap-[20px] mt-[50px] ">
          <input type='text' placeholder="firstName" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input type='text' placeholder="lastName" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <input type='text' placeholder="userName" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg " value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          <input type='text' placeholder="headline" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg " value={heading} onChange={(e)=>setHeading(e.target.value)}/>
          <input type='text' placeholder="location" className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg" value={location} onChange={(e)=>setLocation(e.target.value)}/ >
          <input type='text' placeholder="gender(male/female/other) " className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] 
          text-[18px] border-2 rounded-lg" value={gender} onChange={(e)=>setGeneder(e.target.value)}/ >
          
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Skills</h1>
            {skills &&  <div>
              {skills.map((skills,index)=>(
                <div key={index}>{skills}</div>

              ))}
              </div>}
              <form className="flex flex-col gap-[10px] items-start">
                <input type='text' placeholder="addnew skills" value={newSkills} onChange={(e)=>setNewSkills(e.target.value)} className="w-full
                 h-[50px] outline-none border-gray-600 px-[10px] py-[5px]   text-[16px] border-2 rounded-lg"/>
                <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]'>Add</button>
              </form>
          </div>
         </form>






      </div>
    </div>
  );
};

export default EditProfile;
