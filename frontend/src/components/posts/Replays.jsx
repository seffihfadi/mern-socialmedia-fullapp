import axios from "axios"
import Loader from '../Loader'
import Comment from "./Comment"
import { useState, useEffect } from "react"
import { useAlert } from "../../context/AlertProvider"
import { useNewComment } from "../../context/PostProvider"

const Replays = ({ commentID }) => {

  const [setAlert] = useAlert()
  const [newComment] = useNewComment()
  const [replays, setReplays] = useState([])

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/comments/${commentID}/replays`, 
          {withCredentials: true}
        )
        setReplays(response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch comments'})
      }
    })()
  }, [])

  useEffect(() => {
    if (!newComment || !newComment?.isReplay || newComment?.parentID !== commentID) return
    setReplays(prev => ([newComment, ...prev]))
  }, [newComment])


  return (
    <div className="replays ldr_data">
      {replays.length !== 0
        ? replays.map((replay) => <Comment key={replay._id} comment={replay} type='replay' />) 
        : <Loader msg='loading replays' sm />
      }
    </div>
  )
}

export default Replays