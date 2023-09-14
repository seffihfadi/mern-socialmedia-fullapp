import Replays from "./Replays"
import TimeAgo from 'react-timeago'
import { useState } from "react"
import { usePost, useWriteTo } from "../../context/PostProvider"
import { useAuth } from '../../context/AuthProvider'
import axios from "axios"
import { useAlert } from "../../context/AlertProvider"

const Comment = ({comment, type}) => {
  const isComment = type === 'comment'
  
  const [post, setPost] = usePost()
  const {_id: sessionID} = useAuth()
  const [writeTo, setWriteTo] = useWriteTo()
  const [seeReplays, setSeeReplays] = useState(false)
  const [setAlert] = useAlert()

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/comments/${commentID}/delete`, {withCredentials: true})
      setAlert({type: 'success', text: response.data.message})
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
      setAlert({type: 'error', text: 'can not delete this comment'})
    }
  }


  return (
    <>
    <div className='comment'>
      <div className="img flex-shrink-0">
        <img className="w-10 h-10 rounded-full object-cover" src={comment.owner.image} />
      </div>
      <div className="flex flex-col items-start">
        <h3>{comment.owner.fullname} <span><TimeAgo date={comment.createdAt} /></span></h3>
        <p>{comment.body}</p>
        {isComment && 
          <div className="flex gap-2 mt-3 text-gray-600">
            <button onClick={() => {
              setWriteTo({postID: post._id, commentID: comment._id, owner: comment.owner})
            }}>
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
      {sessionID === comment.owner._id &&
        <button onClick={() => {handleDeleteComment(comment._id)}} className="ml-auto">
          <i className="uil uil-trash"></i>
        </button>
      }
    </div>
    {seeReplays && comment.replays > 0 && <Replays commentID={comment._id} />}
    </>
  )
}

export default Comment