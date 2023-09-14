import { createContext, useContext, useState } from "react"

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)[0]
}

export const useWriteTo = () => {
  return useContext(PostContext)[1]
}

const PostProvider = ({children, post}) => {
  const [currentPost, setCurrentPost] = useState(post)
  const [writeTo, setWriteTo] = useState({postID: post._id, commentID: '', owner: null})
  return (
    <PostContext.Provider value={[[currentPost, setCurrentPost], [writeTo, setWriteTo]]}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider