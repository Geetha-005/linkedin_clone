import express from "express"
import isAuth from "../middleware/isAuth"
import upload from "../middleware/multer"
import { createPost } from "../controllers/post.controller.js"

const postRouter=express.Router()


postRouter.post("/create",isAuth,upload.single("image"),createPost)



export default postRouter