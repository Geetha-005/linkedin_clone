import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const genToken=(userId)=>{

    try{
        return jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        
    }
    catch(error){
        console.log(error)

    }
}


export default genToken