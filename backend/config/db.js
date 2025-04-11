import mongoose from "mongoose";


const connectDB=async()=>{

    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('db is connected')

    }
    catch(error){
        console.log('db is not connected')

    }
}

export default connectDB;