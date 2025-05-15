import express from 'express'
import { About, Contact, Home, login, logOut, signUp } from '../controllers/auth.controllers.js'


const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.post("/",Home)
// authRouter.get("/",GetData)
authRouter.get("/about",About)
authRouter.get("/contact",Contact)



export default authRouter