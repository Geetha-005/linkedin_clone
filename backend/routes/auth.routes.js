import express from 'express'
import { signUp } from '../controllers/auth.controllers.js'


const authRouter=express.Router()

authRouter.post("/signup",signUp)



export default authRouter