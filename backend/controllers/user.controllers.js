import User from "../models/user.model.js"


export const getCurrentUser=async(req,res)=>{
    try{
    
        let id=req.userId
        console.log(id)
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message:"get current user error"})
        
    }

}



export const updateProfile=async(req,res)=>{

}