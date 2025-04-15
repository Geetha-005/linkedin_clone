// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv';


// const isAuth= async(req,res,next)=>{
//     try{
       
//         let {token}=req.cookies
//         if(!token){
//             return res.status(400).json({message:"user deos not have token"})

//         }
//         let verifyToken= jwt.verify(token,process.env.JWT_SECRET_KEY)
//         if(!verifyToken){
//             return res.status(400).json({message:"user does not have valid token"})

//         }
//         req.userId=verifyToken.userId
//         console.log(req.userId)
//         next()
//     }
//     catch(error){
//         return res.status(500).json({message:"is auth error"})

//     }
// }

// export default isAuth



import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.userId;
    console.log("Authenticated user ID:", req.userId);

    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default isAuth;
