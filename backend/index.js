import express from 'express'
import dotenv from 'dotenv' 
import connectDB from "./config/db.js"
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import connectionRouter from './routes/connection.routes.js';
import http from "http"
import { Server } from 'socket.io';


dotenv.config()

const app=express()
let server=http.createServer(app)
export const io=new Server(server,{
    cors:({
        origin:"http://localhost:5173",
    credentials:true
    })
})
const port=process.env.PORT||5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/connection",connectionRouter)


export const userSocketMap=new  Map()

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
     socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
        console.log(userSocketMap)
     })
    socket.on("disconnect",(socket)=>{
        console.log("user disconnected",socket.id)
    })
})


server.listen(port,()=>{
    connectDB()
    console.log(`server is running on the port number  ${port}`)
})


//password  radhakrishna


// http://localhost:8000/api/auth/signup



