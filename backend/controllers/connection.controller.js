import Connection from "../models/connections.model"
import User from "../models/user.model"

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
    sender,receiver:id,
    status:"pending"
   })
   if(existingConnection){
    return res.status(400).json({message:"request already exist"})
   }
   let newRequest=await Connection.create({
    sender,
    receiver:id,

   })

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