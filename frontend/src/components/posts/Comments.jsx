import axios from "axios"
import Loader from '../Loader'
import Comment from "./Comment"
import { useState, useEffect } from "react"
import { usePost } from "../../context/PostProvider"
import { useAuth } from "../../context/AuthProvider"
import { useAlert } from "../../context/AlertProvider"
import { useNewComment } from "../../context/PostProvider"

const Comments = () => {
  const user = useAuth()
  const [post] = usePost()
  const [setAlert] = useAlert()
  const [comments, setComments] = useState([])
  const [newComment] = useNewComment()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/comments/${post._id}`, {withCredentials: true})
        setComments(response.data)
        // console.log('comments', response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch comments'})
      }
    })()
  }, [])

  useEffect(() => {
    if (!newComment || newComment?.isReplay) return
    setComments(prev => ([newComment, ...prev]))
  }, [newComment])

  return (
    <div className="comments">
      <h1 className="head_text">comments</h1>
      <div className="ldr_data">
        {comments.length !== 0
          ? comments.map((comment) => <Comment key={comment._id} comment={comment} type='comment' />) 
          : <Loader msg='loading comments' sm />
        }
      </div>
    </div>
  )
}

export default Comments