import React from "react";
import profile from "../assets/profile.jpeg"
import moment from "moment"





const Post = ({ id, author, like, comment, description, image,createdAt }) => {


  return (
    <div className="w-full min-h-[500px] bg-white rounded-lg shadow-lg p-[20px] flex flex-col gap-[10px]">
        
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
        <div>{/* name  */}
        <div className="text-[22px] font-semibold" >{`${author.firstName} ${
            author.lastName
          }`}</div>

       {/* headline */}
         <div className="text-[16px]">{author.headline}</div>
         <div className="text-[16px]">{moment(createdAt).fromNow()}</div>
        </div>
      </div>

      <div>{/* button */}

      </div>
      </div>
          {/* description */}
      <div className="w-full max-h-[100px] overflow-hidden pl-[50px]">{description}</div>

   {/* read more option for more descrption */}

      <div className="pl-[50px] text-[19px] font-semibold">
        read more...
      </div>


    </div>
  );
};

export default Post;
