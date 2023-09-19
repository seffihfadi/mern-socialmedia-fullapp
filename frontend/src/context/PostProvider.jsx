import { createContext, useContext, useState } from "react"

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)[0]
}

export const useWriteTo = () => {
  return useContext(PostContext)[1]
}

export const useNewComment = () => {
  return useContext(PostContext)[2]
}

const PostProvider = ({children, post}) => {
  const [newComment, setNewComment] = useState(null)
  const [currentPost, setCurrentPost] = useState(post)
  const [writeTo, setWriteTo] = useState({postID: post._id, commentID: '', owner: null})


  return (
    <PostContext.Provider value={[
      [currentPost, setCurrentPost], 
      [writeTo, setWriteTo],
      [newComment, setNewComment]
    ]}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider