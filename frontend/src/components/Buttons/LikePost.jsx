import axios from "axios"
import { useState, useEffect } from "react"
import { usePost } from "../../context/PostProvider"

const LikePost = () => {
  const [post, setPost] = usePost()

  const handleLike = async () => {
    setPost(prev => ({...prev, isLiked: !prev.isLiked}))
    console.log('post', post)
    try {
      const response = await axios.patch(`http://127.0.0.1:4000/api/post/${post._id}/reaction`, 
        {}, {withCredentials: true}
      )
      console.log('response', response)
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