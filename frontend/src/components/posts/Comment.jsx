import axios from "axios"
import Replays from "./Replays"
import TimeAgo from 'react-timeago'

import { useState } from "react"
import { useAuth } from '../../context/AuthProvider'
import { useAlert } from "../../context/AlertProvider"
import { usePost, useWriteTo } from "../../context/PostProvider"

const Comment = ({comment, type}) => {

  const [setAlert] = useAlert()
  const [post, setPost] = usePost()
  const {_id: sessionID} = useAuth()
  const [writeTo, setWriteTo] = useWriteTo()
  const [deleted, setDeleted] = useState(false)
  const [seeReplays, setSeeReplays] = useState(false)
  
  const isComment = type === 'comment'
  
  const handleDeleteComment = async (commentID) => {
    setDeleted(true)
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/comments/${commentID}/delete`, 
        {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  const handleReplay = () => {
    setWriteTo({
      postID: post._id, 
      commentID: comment._id, 
      owner: comment.owner
    })
  }


  return (
    <>
    <div className={`comment ${deleted && 'deleted'}`}>
      <div className="img flex-shrink-0">
        <img className="w-10 h-10 rounded-full object-cover" src={comment.owner.image} />
      </div>
      <div className="flex flex-col items-start">
        <h3>{comment.owner.fullname} <span><TimeAgo date={comment.createdAt} /></span></h3>
        <p>{comment.body}</p>
        {isComment && /^[0-9a-fA-F]{24}$/.test(comment._id) && 
          <div className="flex gap-2 mt-3 text-gray-600">
            <button onClick={handleReplay}>
              replay
            </button>
            {comment.replays > 0 &&
             <>
              &bull;
              <button onClick={() => setSeeReplays(!seeReplays)}>view {comment.replays} more replays</button>
             </>
            }
          </div>
        }
      </div>
      {sessionID === comment.owner._id && /^[0-9a-fA-F]{24}$/.test(comment._id) &&
        <button onClick={() => handleDeleteComment(comment._id)} className="ml-auto">
          <i className="uil uil-trash"></i>
        </button>
      }
    </div>
    {seeReplays && comment.replays > 0 && <Replays commentID={comment._id} />}
    </>
  )
}

export default Comment