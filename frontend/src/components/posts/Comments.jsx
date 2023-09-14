import Comment from "./Comment"
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from '../Loader'
import { useAlert } from "../../context/AlertProvider"

import { usePost } from "../../context/PostProvider"

const Comments = () => {
  const [comments, setComments] = useState([])
  const [post] = usePost()
  const [setAlert] = useAlert()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/comments/${post._id}`, {withCredentials: true})
        //console.log('comments', response)
        setComments(response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch comments'})
      }
    })()
  }, [])
  return (
    <div className="comments">
      <h1 className="head_text">comments</h1>
      {comments.length !== 0
        ? comments.map((comment) => <Comment key={comment._id} comment={comment} type='comment' />) 
        : <Loader msg='loading comments' sm />
      }
    </div>
  )
}

export default Comments