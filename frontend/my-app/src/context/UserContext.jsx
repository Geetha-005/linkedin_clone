import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from "axios"



export const userDataContext=createContext()

const UserContext = ({children}) => {
    let [userData,setUserData]=useState(null)
    let[edit,setEdit]=useState(false)
    
    let {serverUrl}=useContext(authDataContext)

    const getCurrentUser=async()=>{
        try{
        let result=await axios.get(serverUrl+"/api/user/currentuser",{
            withCredentials:true
        })
        setUserData(result.data)
    }
    catch(error){
        console.log(error)
        setUserData(null)

    }


    }

    useEffect(()=>{
        getCurrentUser()
    },[])

    const value={
        userData,
        setEdit,edit,
        setUserData
    }


  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
      
    </div>
  )
}

export default UserContext
