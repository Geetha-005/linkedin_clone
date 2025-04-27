import React, { useContext, useRef, useState } from "react";
import axios from "axios"
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../context/UserContext";
import profile from "../assets/profile.jpeg";
import { TiPlus } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { authDataContext } from "../context/AuthContext";

const EditProfile = () => {
  const { edit, setEdit, userData, setUserData } = useContext(userDataContext);
  let {serverUrl}=useContext(authDataContext)

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [headline, setHeadline] = useState(userData.headline || "");
  const [location, setLocation] = useState(userData.location || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    college:"",
    degree:"",
    fieldOfStudy:""
  })
  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title:"",
    company:"",
    description:""
})

let[frontendProfileImage,setFrontendProfileImage]=useState(userData.profileImage ||profile)
let[backendProfileImage,setBackendProfileImage]=useState('')
let[frontendCoverImage,setFrontendCoverImage]=useState(userData.coverImage||null)
let[backendCoverImage,setBackendCoverImage]=useState('')
let[saving,setSaving]=useState(false)
const profileImage=useRef()
const coverImage=useRef()

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      
  }
  setNewSkill("");
    }

    
  const handleAddEducation = (e) => {
    e.preventDefault();
    if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
      setEducation([...education, newEducation]);
      
  }
  setNewEducation({
    college:"",
    degree:"",
    fieldOfStudy:""
  });
    }

  function removeSkill(skill){
    if(skills.includes(skill)){
      setSkills(skills.filter((s)=>s!==skill))
    }
  }

  function removeEducation(edu){
    if(education.includes(edu)){
      setEducation(education.filter((s)=>s!==edu))

    }

  }

  function removeExperience(exp){
    if(experience.includes(exp)){
      setExperience(experience.filter((s)=>s!==exp))
    }
  }
  
  const handleAddExperience = (e) => {
    e.preventDefault();
    if (newExperience.title && newExperience.company && newExperience.description) {
      setExperience([...experience, newExperience]);
      
  }
  setNewExperience({
    title:"",
    company:"",
    description:""
  });
    }

    function handleProfileImage(e){
      let file=e.target.files[0]
       setBackendProfileImage(file)
       setFrontendProfileImage(URL.createObjectURL(file))

    }

    
    function handleCoverImage(e){
      let file=e.target.files[0]
       setBackendCoverImage(file)
       setFrontendCoverImage(URL.createObjectURL(file))

    }
  
    const handleSaveProfile=async()=>{
       setSaving(true)
      try{
        let formdata=new FormData()
        formdata.append("firstName",firstName)
        formdata.append("lastName",lastName)
        formdata.append("userName",userName)
        formdata.append("headline",headline)
        formdata.append("skills",JSON.stringify(skills))
        formdata.append("location",location)
        formdata.append("education",JSON.stringify(education))
        formdata.append("experience",JSON.stringify(experience))

        if(frontendProfileImage){
          formdata.append("profileImage",backendProfileImage)
        }
        if(frontendCoverImage){
          formdata.append("coverImage",backendCoverImage)
        }

        let result=await axios.put(serverUrl+"/api/user/updateProfile",formdata,{
          withCredentials:true,
          // headers: {
          //   "Content-Type": "multipart/form-data", // very important for file uploads
          // },
        })
        console.log("Response status:", result.status);
        setUserData(result.data)
        setSaving(false)
        setEdit(false)
        



      }
      catch(error){
        console.log(error)

      }
    }

  return (
    <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
      <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage} />
      <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage} />
      <div className="w-full h-full bg-black opacity-[0.5] absolute top-0 left-0" ></div>

      <div className="w-[90%] max-w-[500px] h-[600px] bg-white relative overflow-auto z-[200] shadow-lg rounded-lg p-[10px]">
        <div
          className="absolute top-[20px] right-[20px] cursor-pointer"
          onClick={() => setEdit(false)}
        >
          <RxCross2 className="w-[30px] cursor-pointer h-[25px] text-gray-800 font-bold" />
        </div>

        <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden 
        " onClick={()=>coverImage.current.click()}>
          <img src={frontendCoverImage} alt="" className="w-full" />
          <FiCamera className="absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white cursor-pointer" />
        </div>

        <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px]"
        onClick={()=>profileImage.current.click()}>
          <img src={frontendProfileImage} alt="" className="w-full h-full" />
        </div>

        <div className="w-[20px] h-[20px] bg-[#17c1ff] absolute top-[200px] left-[90px] rounded-full flex justify-center items-center">
          <TiPlus className="text-white" />
        </div>

        <div
          className="w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]"
          
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Gender (male/female/other)"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
          />

          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Skills</h1>
            {skills && <div className="flex felx-col gap-[10px]">
            {skills.map((skill, index) => (
              <div key={index} className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 rounded-lg
              p-[10px] flex justify-between items-center">
                <span>{skill}</span>
                <RxCross2 onClick={()=>removeSkill(skill)} className="w-[20px] cursor-pointer h-[20px] text-gray-800 font-bold" />
      
                
              </div>
            ))}
            </div>}

            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
              onClick={handleAddSkill}>
                Add Skill
              </button>
            </div>

            
          </div>
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Education</h1>
            {education && <div className="flex felx-col gap-[10px]">
            {education.map((edu ,index) => (
              <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg
              p-[10px] flex justify-between items-center">
                <div>
                  <div>college:{edu.college}</div>
                  <div>degree:{edu.degree}</div>
                  <div>fieldofStudy:{edu.fieldOfStudy}</div>

                  </div>
                
                <RxCross2  onClick={()=>removeEducation(edu)} className="w-[20px] cursor-pointer h-[20px] text-gray-800 font-bold" />
      
                
              </div>
            ))}
            </div>}

            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="college"
                value={newEducation.college}
                onChange={(e) => setNewEducation({... newEducation,college:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({... newEducation,degree:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="field of study"
                value={newEducation.fieldOfStudy}
                onChange={(e) => setNewEducation({... newEducation,fieldOfStudy:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
              onClick={handleAddEducation}>
                Add Education
              </button>
            </div>

            
          </div>


          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Experience</h1>
            {experience && <div className="flex felx-col gap-[10px]">
            {experience.map((exp, index) => (
              <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg
              p-[10px] flex justify-between items-center">
                <div>
                  <div>Title:{exp.title}</div>
                  <div>Company:{exp.company}</div>
                  <div>Description:{exp.description}</div>

                  </div>
                
                <RxCross2  onClick={()=>{removeExperience(exp)}} className="w-[20px] cursor-pointer h-[20px] text-gray-800 font-bold" />
      
                
              </div>
            ))}
            </div>}

            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="title"
                value={newExperience.title}
                onChange={(e) => setNewExperience({... newExperience,title:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="companny"
                value={newExperience.company}
                onChange={(e) => setNewExperience({... newExperience,company:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="field of study"
                value={newExperience.description}
                onChange={(e) => setNewExperience({... newExperience,description:e.target.value})}
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]"
              onClick={handleAddExperience}>
                Add Experience
              </button>
            </div>

            
          </div>
           <button
            type="submit"
            className="w-[100%] h-[50px] rounded-full bg-[#2dc0ff] text-white font-semibold"   
            disabled={saving}
           onClick={handleSaveProfile}>
            {saving ?"saving ..." :"Save profile"}
          </button> 



        </div>
      </div>
    </div>
  );
}
export default EditProfile;