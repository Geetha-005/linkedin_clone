import express from 'express'
import { getCurrentUser, updateProfile } from '../controllers/user.controllers.js'
import isAuth from '../middleware/isAuth.js'
import upload from "../middleware/multer.js"


let userRouter=express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)

userRouter.put("/updateProfile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)







export default userRouter


