import React, { useContext, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FiCamera } from "react-icons/fi";
import { userDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import EditProfile from "../components/EditProfile";
import { BsImage } from "react-icons/bs";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import Post from "../components/Post";



const Home = () => {
  let { userData, setUserData, setEdit, edit,postData,setPostData } = useContext(userDataContext);
  let {serverUrl}=useContext(authDataContext)
  let [frontendImage,setFrontendImage]=useState("")
  let [backendImage,setBackendImage]=useState("")
 let [description,setDescription]=useState("")
 let[uploadPost,setUploadPost]=useState(false)
 let [posting,setPosting]=useState(false)
 let  image=useRef()
 function handleImage(e){
  let file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))

 }

  async function handleUploadPost(){
     setPosting(true)
    try{
    let formdata=new FormData()
    formdata.append("description",description)

    if(backendImage){
      formdata.append("image",backendImage)
    }
 let result =await axios.post(serverUrl+ "/api/post/create",formdata,{withCredentials:true})

 console.log(result)
 setPosting(false)

    }
    
  catch(error){
    console.log(error)
    setPosting(false)

    }
  }






  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] relative flex items-center lg:items-start  
    lg:justify-center gap-[20px] px-[20px] flex-col lg:flex-row  pb-[50px]">
      {edit && <EditProfile />}

      <NavBar />

      {/* Left Profile Card */}
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg p-[10px] relative">
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
        </div>

        <button
          className="w-full h-[40px] my-[30px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
          onClick={() => setEdit(true)}
        >
          Edit Profile <HiPencil />
        </button>
      </div>

     {uploadPost &&
      <div className="w-full h-full bg-black fixed  z-[100] top-0 opacity-[0.6] left-0">
        </div>}

          {uploadPost && 
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg fixed z-[200] p-[20px]
      flex items-start justify-start flex-col gap-[20px] ">
        <div className="absolute top-[20px] right-[20px] cursor-pointer">
          <RxCross2 className="w-[30px] cursor-pointer h-[25px] text-gray-800 font-bold" onClick={()=>setUploadPost(false)}/>
        </div>
       <div className="flex justify-start items-center gap-[10px] ">
        <div
          className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center 
           cursor-pointer"
        >
          <img
            src={userData.profileImage || profile}
            alt=""
            className="h-full"
          />
        </div>
        <div className="text-[22px]">{`${userData?.firstName || ""} ${
            userData?.lastName || ""
          }`}</div>
        </div>
        <textarea className={`w-full ${frontendImage ?"h-[200px]":"h-[550px]"} outline-none border-none p-[10px] 
        resize-none text-[19px]`} placeholder="what to you want to talk about ...?"  value={description}
        onChange={(e)=>setDescription(e.target.value)}>
        </textarea>
        
        <input type="file" ref={image} hidden onChange={handleImage} />
          <div className="w-full h-[300px] overflow-hidden flex justify-center items-center rounded-lg ">
            <img src={frontendImage||""} alt="" className="h-full rounded-lg" />
          </div>

        <div className="w-full h-[200px] flex flex-col">
          <div className="p-[20px] flex items-center justify-start border-b-2 border-gray-500">
          <BsImage className="w-[24px] h-[24px] text-gray-500" onClick={()=>image.current.click()}/>
          </div>


          <div className="flex justify-end items-center" >
            <button className="w-[100px] h-[50px] rounded-full bg-[#2dc0ff] text-white font-semibold" 
              disabled={posting} onClick={handleUploadPost}>
             {posting ?"posting...?":"post"}
            </button>
          
          </div>
        </div>
      </div>}


      {/* Middle Section */}
      <div className="w-full lg:w-[50%] min-h-[200px] bg-bg-[#f0efe7] flex flex-col gap-[20px] ">
        {/* Add your feed/posts here */}
        <div
          className="w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center justify-center
        gap-[10px] "
        >
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img
              src={userData.profileImage || profile}
              alt=""
              className="h-full"
            />
          </div>
          <button
            className="w-[80%] h-[60%] border-2 border-gray-500 rounded-full
        flex items-center justify-start px-[20px] hover:bg-gray-200 "
          onClick={()=>setUploadPost(true)}>
            start a post
          </button>
        </div>
        {postData .map((post,index)=>(
              <Post  key={index} id={post._id} description={post.description} image={post.image}
              author={post.author} like={post.like} comment={post.comment}  createdAt={post.createdAt}  /> 
        ))}
        
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg">
        {/* Add widgets/ads or suggestions here */}
      </div>
    </div>
  );
};

export default Home;

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
