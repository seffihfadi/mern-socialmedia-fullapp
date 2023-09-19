import axios from "axios"
import { useEffect, useState, useRef } from "react"

import { tagName } from "../../utils/code"
import { useAuth } from "../../context/AuthProvider"
import { useAlert } from "../../context/AlertProvider"
import { useNewComment } from "../../context/PostProvider"

const WriteComment = ({ postID, commentID, owner }) => {
  const inputRef = useRef()
  const [setAlert] = useAlert()
  const {image, fullname, _id} = useAuth()
  const [comment, setComment] = useState('')
  const [newComment, setNewComment] = useNewComment()
  
  const isWriteComment = commentID === ''
  
  useEffect(() => {
    if (!owner) return
    setComment(tagName(owner.fullname) + ' ')
    inputRef.current.focus()
  }, [owner])
  
  const handleCreateComment = async (e) => {
    e.preventDefault()
    const newCommentDoc = {
      _id: Date.now(),
      owner: {image, fullname, _id},
      replays: 0,
      body: comment,
      createdAt: new Date(Date.now()),
      isReplay: !isWriteComment,
      parentID: isWriteComment ? postID : commentID
    }
    
    setComment('')
    setNewComment(newCommentDoc)
    const replayFor = owner?._id

    try {
      const response = await axios.post('http://127.0.0.1:4000/api/comments/create', 
        {comment, postID, commentID, replayFor}, {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})

    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  return (
    <div className="write_comment">
      <form className="flex gap-3 items-center" noValidate>
        <div className="relative w-full">
          <input
            ref={inputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)} 
            name="comment" 
            className="glass" 
            type="text" 
            placeholder={`write a ${isWriteComment ? 'comment' : 'replay'}`}
            required
          />
          <img 
            className="left-1 top-1 absolute w-8 h-8 rounded-full object-cover" 
            src={image} 
            alt='profile img' 
          />
        </div>
        {comment.length > 0 &&
          <div className="flex">
            <button onClick={handleCreateComment}><i className="uil uil-message"></i></button>  
          </div>
        }
      </form>
    </div>
  )
}

export default WriteComment