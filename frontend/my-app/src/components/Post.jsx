import React, { useContext, useEffect, useState } from "react";
import profile from "../assets/profile.jpeg";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { BiSolidLike } from "react-icons/bi";
import { LuSendHorizontal } from "react-icons/lu";
import {io} from "socket.io-client"
import ConnectioButton from "./ConnectioButton";


let socket=io("http://localhost:8000")
const Post = ({ id, author, like, comment, description, image, createdAt }) => {
  let [more, setMore] = useState(false);
  let [likes, setLikes] = useState(like || []);
  let[comments,setComments]=useState(comment||[])
  let [commentContent,setCommentContent]=useState("")
  let[showComment,setShowContent]=useState(false)

  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData, getPost } = useContext(userDataContext);

  const handleLike = async () => {
    try {
      let result = await axios.get(serverUrl + `/api/post/like/${id}`, {
        withCredentials: true,
      });
      console.log(result);
      setLikes(result.data.like);
    } catch (error) {
      console.log(error);
    }
  };



  const handleComment = async (e) => {
    e.preventDefault()
    try {

      let result = await axios.post(serverUrl + `/api/post/comment/${id}`,{
        content:commentContent
      }, {
        withCredentials: true,
      });
      
      setComments(result.data.comment);
      console.log(result.data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    socket.on("likeUpdated",({postId,likes})=>{
      if(postId==id){
        setLikes(likes)

      }
    })

    socket.on("commentAdded",({postId,comm})=>{
      if(postId==id){
        setComments(comm)

      }
    })
     return ()=>{
      socket.off("likeUpdated")
      socket.off("commentAdded")
     }
  },[id])


  useEffect(() => {
    getPost();
  }, [likes, setLikes,comments]);

  return (
    <div className="w-full min-h-[200px] bg-white rounded-lg shadow-lg p-[20px] flex flex-col gap-[10px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-centers items-start gap-[10px]">
          {/* profile image */}
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img
              src={author.profileImage || profile}
              alt=""
              className="h-full"
            />
          </div>
          <div>
            {/* name  */}
            <div className="text-[22px] font-semibold">{`${author.firstName} ${author.lastName}`}</div>

            {/* headline */}
            <div className="text-[16px]">{author.headline}</div>
            <div className="text-[16px]">{moment(createdAt).fromNow()}</div>
          </div>
        </div>

        <div>{/* button */}
          {
            userData._id!=author._id &&
          
          <ConnectioButton  userId={author._id} />
          }
        </div>
      </div>
      {/* description */}
      <div
        className={`w-full ${
          !more ? "max-h-[100px] overflow-hidden" : ""
        } pl-[50px]`}
      >
        {description}
      </div>

      {/* read more option for more descrption */}

      <div
        className="pl-[50px] text-[19px] font-semibold cursor-pointer"
        onClick={() => setMore((prev) => !prev)}
      >
        {more ? "read less ..." : "read more..."}
      </div>

      {image && (
        <div className="w-full h-[300px] overflow-hidden flex  justify-center rounded-lg">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      )}

      <div>
        <div className="w-full flex justify-between items-center p-[20px]">
          {/* like */}
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <BiLike className="text-[#1ebbff] w-[20px] h-[20px]" />
            <span>{like.length}</span>
          </div>

          {/* comment */}
          <div className="flex items-center justify-center gap-[5px] text-[18px] cursor-pointer" onClick={()=>setShowContent(prev=>!prev)}>
            <span>{comments.length}</span>
            <span>Comment</span>
          </div>
        </div>

        <div className="flex justify-start items-center w-full p-[20px] gap-[20px] ">
          {likes.includes(userData._id) && (
            <div
              className="flex justify-center items-center gap-[5px]"
              onClick={handleLike}
            >
              <BiSolidLike className="w-[24px] h-[24px] text-[#07a4ff]" />
              <span className="text-[#07a4ff]">Liked</span>
            </div>
          )}
          {!likes.includes(userData._id) && (
            <div
              className="flex justify-center items-center gap-[5px]"
              onClick={handleLike}
            >
              <BiLike className="w-[24px] h-[24px]" />
              <span>Like</span>
            </div>
          )}
          {/* <div className="flex justify-center items-center gap-[5px]" onClick={handleLike}>

                <BiLike className="w-[24px] h-[24px]" />
                <span>{likes.includes(userData._id)?"Liked":"Like"}</span>
            </div> */}

          <div className="flex justify-center items-center gap-[5px] cursor-pointer" onClick={()=>setShowContent(prev=>!prev)}>
            <FaRegCommentDots className="w-[24px] h-[24px]" />
            <span>Comment</span>
          </div>
        </div>

        {showComment &&

        <div>
            <form className="w-full flex justify-between items-center border-b-2 border-b-gray-300 p-[10px]"
            onSubmit={handleComment}>
                <input type="text" placeholder="{leave a comment}" className="outline-none  border-none" 
                onChange={(e)=>setCommentContent(e.target.value)} value={commentContent} />
                <button><LuSendHorizontal className="text-[#07a4ff] w-[22px]"/></button>
            </form>
            <div className="flex flex-col gap-[10px]">
            {comments.map((com)=>(
              <div  key={com._id} className="flex flex-col gap-[10px] border-b-2 border-b-gray-300 p-[10px]"> 
                <div className="w-full flex justify-start items-center gap-[20px] ">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer">
            <img
              src={com.user.profileImage || profile}
              alt=""
              className="h-full"
            />
          </div>
          <div>
          <div className="text-[22px] font-semibold">{`${com.user.firstName} ${com.user.lastName}`}</div>
          <div>{moment(com.createdAt).fromNow()}</div>
          </div>

                 </div>
                 <div className="pl-[50px]">{com.content}</div>
              </div>
            ))}
            </div>
        </div>}
      </div>
    </div>
  );
};

export default Post;
