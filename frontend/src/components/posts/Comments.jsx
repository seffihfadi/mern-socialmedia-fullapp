import Comment from "./Comment"
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from '../Loader'
import { useAlert } from "../../context/AlertProvider"
import { usePost } from "../../context/PostProvider"
import { useAuth } from "../../context/AuthProvider"

const Comments = () => {
  const [comments, setComments] = useState([])
  const [post] = usePost()
  const [setAlert] = useAlert()
  const user = useAuth()

  useEffect(() => {
    (async function() {
      try {
        // const comm = {
        //   _id: "6503539b19125109f7320139",
        //   owner: user,
        //   replays: 0,
        //   body: "@imedfadi hhhhhh",
        //   createdAt: new Date(Date.now())
        // }
        const response = await axios.get(`http://127.0.0.1:4000/api/comments/${post._id}`, {withCredentials: true})
        //console.log('comments', response)
        setComments(response.data)
        //setComments([...comments, comm])
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch comments'})
      }
    })()
  }, [])
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