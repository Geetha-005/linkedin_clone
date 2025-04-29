import Connection from "../models/connections.model.js"
import User from "../models/user.model.js"
import {io,userSocketMap} from "../index.js"


export const sendConnection =async(req,res)=>{ 

    try{
        let {id}=req.params
        let sender=req.userId
        let user=await User.findById(sender)
        if(sender==id){
            return res.status(400).json({message:"you cant send request yourslef"})

        }
        if(user.connection.includes(id))
{
    return res.status(400).json({message:"you are already connected this user"})
}
   let existingConnection=await Connection.findOne({
    sender,
    receiver:id,
    status:"pending"
   })
   if(existingConnection){
    return res.status(400).json({message:"request already exist"})
   }
   let newRequest=await Connection.create({
    sender,
    receiver:id,

   })
      
   let receiverSocketId=userSocketMap.get(id)
   let senderSocketId=userSocketMap.get(sender)
   
   if(receiverSocketId){
    io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:sender,newStatus:"received"})
   }

   if(senderSocketId){
    io.to(senderSocketId).emit("statusUpdate",{updatedUserId:id,newStatus:"pending"})
   }
     
   return res.status(200).json(newRequest)
    }

    catch(error){
        return res.status(500).json({message:'sending connection error ${error}'})

    }
}


export const acceptConnection=async(req,res)=>{

    try{
        let {connectionId}=req.params
        let connection=await Connection.findById(connectionId)
        if(!connection){
            return res.status(400).json({message:"connection does not exist"})
        }
        if(connection.status!="pending"){
            return res.status(400).json({message:"request under the process"})
        }
        connection.status="accepted"
        await connection.save()
        await User.findByIdAndUpdate(req.userId,{
            $addToSet:{connection:connection.sender._id}
        })
        await User.findByIdAndUpdate(connection.sender._id,{
            $addToSet:{connection:connection.sender._id}
        })


    let receiverSocketId=userSocketMap.get(connection.receiver._id.toString())
   let senderSocketId=userSocketMap.get(connection.sender._id.toString())
   
   if(receiverSocketId){
    io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:connection.sender._id,newStatus:"disconnect"})
   }

   if(senderSocketId){
    io.to(senderSocketId).emit("statusUpdate",{updatedUserId:req.userId,newStatus:"disconnect"})
   }

        return res.status(200).json({message:"connection accepted"})


    }
    catch(error){
        return res.status(500).json({message:"connection is accepted error"})

    }

}



export const rejectConnection=async(req,res)=>{

    try{
        let {connectionId}=req.params
        let connection=await Connection.findById(connectionId)
        if(!connection){
            return res.status(400).json({message:"connection does not exist"})
        }
        if(connection.status!="pending"){
            return res.status(400).json({message:"request under the process"})
        }
        connection.status="rejected"
        await connection.save()
        

        return res.status(200).json({message:"connection rejected"})


    }
    catch(error){
        return res.status(500).json({message:`connection rejection error ${error}`})

    } 

}
export const getConnectionStatus=async(req,res)=>{

    try{
        const targetUserId=req.params.userId
        const currentUserId=req.userId

        let currentUser=await User.findById(currentUserId)
        if(currentUser.connection.includes(targetUserId)){
            return res.json({status:"disconnect"})

        }
        const pendingRequest=await Connection.findOne({
            $or:[
                {
                    sender:currentUserId,receiver:targetUserId
                },
                {
                    sender:targetUserId,receiver:currentUserId
                }
            ],
            status:"pending",
        })
        if(pendingRequest){
            if(pendingRequest.sender.toString()===currentUserId.toString()){
                return res.json({status:"pending"})
            }
            else{
                return res.json({status:"received",requestId:pendingRequest._id})
            }
        }
        return res.json({status:"Connect"})


    }
    catch(error){
        return res.status(500).json({message:"getConnection error"})
    }

}

export const removeConnection=async(req,res)=>{
    try{
        const myId=req.userId
        const otherUserId=req.params.userId
        await User.findByIdAndUpdate(myId,{$pull:{connection:otherUserId}})
        await User.findByIdAndUpdate(otherUserId,{$pull:{connection:myId}})

        let receiverSocketId=userSocketMap.get(otherUserId)
        let senderSocketId=userSocketMap.get(myId)
        
        if(receiverSocketId){
         io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:myId,newStatus:"connect"})
        }
     
        if(senderSocketId){
         io.to(senderSocketId).emit("statusUpdate",{updatedUserId:otherUserId,newStatus:"connect"})
        }


       return res.json({message:"Connection removed successfully"})
    }
    catch(error){
        res.status(500).json({message:"remove Connection error"})
    }
}

export const getConnectionRequests=async(req,res)=>{

    try{
        const userId=req.userId
        const requests=await Connection.find({receiver:userId,status:"pending"}).
        populate("sender","firstName lastName email userName profileImage headline")

       return res.status(200).json({requests})
    }
    catch(error){
        console.log("error in  getConnectionRequests controller:",error)
        return res.status(500).json({message:"sever error"})

    }
}


export const getUserConnections=async(req,res)=>{

    try{
        const userId=req.userId
        const user=await User.findById(userId).
        populate("connection","firstName lastName connection userName profileImage headline")

       return res.status(200).json(user.connection)
    }
    catch(error){
        console.log("error in  getUserConnections controller:",error)
        return res.status(500).json({message:"sever error"})

    }
}