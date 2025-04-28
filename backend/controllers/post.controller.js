import uploadOnCloudinary from "../config/cloudinary.js"
import Post from "../models/post.model.js"

export const createPost=async(req,res)=>{

    try{
        let {description}=req.body
        let newPost
        if(req.file){
            let image=await uploadOnCloudinary(req.file.path)
            newPost=await Post.create({
                author:req.userId,
                description,
                image
            })
        }
        else{
             newPost=await Post.create({
                description,
                author:req.userId
                
            })
        }
        return res.status(201).json(newPost)

    }
    catch(error){
        return res.status(500).json('create post error')


    }
}


export const getPost=async(req,res)=>{

    try{
        const post=await Post.find().populate("author","firstName lastName profileImage headline")
        return res.status(200).json(post)


    }
    catch(error){
        return res.status(500).json({message:"get post error"})

    }
}


export const like=async(req,res)=>{

    try{
        let postId=req.params.id
        let userId=req.userId

        let post=await Post.findById(postId)

        if(!post){
            return res.status(400).json({message:"post not found"})
        }
        if(post.like.includes(userId)){
           post.like= post.like.filter((id)=>id!=userId)
        }
        else{
        post.like.push(userId)
        }

         await post.save()
         return res.status(200).json(post)
    }
    catch(error){
        return res.status(500).json({message:`like error ${error}`})

    }
}



export const comment=async(req,res)=>{

    try{
        let postId=req.params.id
        let userId=req.userId
        let {content}=req.body

        let post=await Post.findByIdAndUpdate(postId,{
            $push:{comment:{content,user:userId}}
        },{new:true}).populate("comment.user","firstName lastName profileImage headline")

        return res.status(200).json(post)

    }
    catch(error){
        return res.status(500).json({message:`comment  error ${error}`})


    }

}