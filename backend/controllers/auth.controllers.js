import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'


export const signUp=async(req,res)=>{

    try{
        const {firstName,lastName,userName,email,password}=req.body
        const existEmail=await User.findOne({email})
        if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
        if(existEmail){
            return res.status(400).json({message:"email is already existed"})
        }
        if(password.length<8){
            return res.status(400).json({message:"password must be at least 8 characters"})

        }
        const existUsername=await User.findOne({userName})
        if(existUsername){
            return res.status(400).json({message:"username is already existed"})
        }

        let hassPassword=await bcrypt.hash(password,10)
        const user=await User.create({firstName,lastName,userName,email,password:hassPassword})
        let token=genToken(user._id)
        console.log("Generated token:", token);
       res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENVIRONMENT==="production"
       })
        return  res.status(200).json(user)
    
    }   

    catch(error)
    {
        return res.status(500).json({message:"signup failed"})
        console.log(error)
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
        if(!user){
            return res.status(400).json({message:"user does not exists"})
        }
        
         const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).json({message:"password is incorrect"})
         }
        
        let token=genToken(user._id)
        console.log("Generated token:", token);
       res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENVIRONMENT==="production"
       })
        return  res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"login error"})
    }
}

export const logOut=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"logout error"})
    }
}