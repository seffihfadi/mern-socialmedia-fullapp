import axios from "axios"
import { useState } from "react"
import { usePost } from "../../context/PostProvider"

const LikePost = ({pin=null}) => {
  // console.log(' pin',  pin)
  const [post, setPost] = !!pin ? useState(pin) : usePost()

  const handleLike = async () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1, 
    }))

    try {
      await axios.patch(`http://127.0.0.1:4000/api/post/${post._id}/reaction`, 
        {}, {withCredentials: true}
      )
    } catch (error) {
      console.log('error', error)
    }
  }


  return (
    <button className="reaction" onClick={handleLike}>
      <i className={`uil uil-heart-alt ${post.isLiked && 'active'}`}></i>
    </button>
  )
}

export default LikePost