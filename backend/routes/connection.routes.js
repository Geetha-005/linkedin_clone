import express from "express"
import { acceptConnection, rejectConnection, sendConnection } from "../controllers/connection.controller.js"
import isAuth from "../middleware/isAuth.js"


let connectionRouter=express.Router()

connectionRouter.get("/send/:id",isAuth,sendConnection)
connectionRouter.get("/accept/:connectionid",isAuth,acceptConnection)
connectionRouter.get("/rejected/:connectionid",isAuth,rejectConnection)

export default connectionRouter