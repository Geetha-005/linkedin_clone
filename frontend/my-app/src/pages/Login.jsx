import React, { useContext, useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
const Login = () => {
    let navigate=useNavigate()
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [isShow,setIsShow]=useState(false)
    let [loading,setLoading]=useState(false)
    let [error,setError]=useState('')
  let {serverUrl}=useContext(authDataContext)
  let {userData,setUserData}=useContext(userDataContext)


  const handleSignIn=async(e)=>{
       e.preventDefault() 
       setLoading(true)
    try{
        let result=await axios.post(serverUrl+"/api/auth/login",{
          
          email,
          password
        },{withCredentials:true})
        console.log(result)
        setUserData(result.data)
        navigate("/")
        setLoading(false)
        setError('')
        setEmail("")
        setPassword("")
        

         }
         catch(error){
            setError(error.response.data.message)
            setLoading(false)

         }
  }
    return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start gap-[10px] '>
      <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'> 
        <img src={logo} alt="" />
      </div>

      <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col
      justify-center gap-[10px] p-[15px]'
      onSubmit={handleSignIn}>
        <h1 className='text-gray-800 text-[30px] font-semibold'>Login</h1>
        <input type="email" placeholder='enter email' required className='w-[100%] h-[50px] boder-2 border-gray-600 
        text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md relative'>
        <input type={isShow ?"text" :"password"} placeholder='enter password' required className='w-full h-full 
        border-none text-[18px] text-gray-800 px-[20px] py-[18px] rounded-md' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <span className='absolute right-[20px] top-[10px] text-[#1dc9fd] font-semibold cursor-pointer'
        onClick={()=>setIsShow(prev=>!prev)}>{isShow?"hidden":"show"}</span>
        </div>
        {error && <p className='ext-center text-red-500'>
            {error}
            </p>}
        <button className='w-[100%] h-[40px] rounded-full bg-[#1dc9fd] mt-[30px] text-white
        ' disabled={loading}>{loading?"loading...":"Login"}</button>
    <p className='text-center cursor-pointer' onClick={()=>navigate("/signup")}>Create an account ? <span className='text-[#2a9bd8]'>Signup</span></p>
    
    </form>
    </div>
  )
}

export default Login
