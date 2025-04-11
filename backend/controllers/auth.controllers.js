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

        const existUsername=await User.findOne({userName})
        if(existUsername){
            return res.status(400).json({message:"username is already existed"})
        }

        let hassPassword=await bcrypt.hash(password,10)
        const user=await User.create({firstName,lastName,userName,email,password:hassPassword})
        let token=genToken(user._id)
       res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENVIRONMENT==="production"
       })

        return  res.status(201).json(user)

        
    
    }   

    catch(error)
    {

        return res.status(500).json({message:"signup failed"})
        console.log(error)
        
    }
}

//     }


// }


// export const signUp = async (req, res) => {
//     try {
//       const { firstName, lastName, userName, email, password } = req.body;
  
//       if (!firstName || !lastName || !userName || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       const existEmail = await User.findOne({ email });
//       if (existEmail) {
//         return res.status(400).json({ message: "Email is already existed" });
//       }
  
//       const existUsername = await User.findOne({ userName });
//       if (existUsername) {
//         return res.status(400).json({ message: "Username is already existed" });
//       }
  
//       const hashPassword = await bcrypt.hash(password, 10);
//       const user = await User.create({
//         firstName,
//         lastName,
//         userName,
//         email,
//         password: hashPassword,
//       });
  
//       const token = genToken(user._id);
//       res.cookie("token", token, {
//         httpOnly: true,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV === "production",
//       });
  
//       return res.status(201).json(user);
//     } catch (error) {
//       console.error("Signup Error:", error);
//       return res.status(500).json({ message: "Signup failed", error: error.message });
//     }
//   };
  