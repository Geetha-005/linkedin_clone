import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
<<<<<<< HEAD
import axios from "axios"


=======
>>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880

export const userDataContext=createContext()

const UserContext = ({children}) => {
    let [userData,setUserData]=useState(null)
<<<<<<< HEAD
    let[edit,setEdit]=useState(false)
    
=======
>>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
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
<<<<<<< HEAD
        setEdit,edit,
=======
>>>>>>> de1eaec143517e933e4274c5186b3fc4d2df8880
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
