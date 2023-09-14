import Comment from "./Comment"
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from '../Loader'
import { useAlert } from "../../context/AlertProvider"

const Replays = ({ commentID }) => {
  const [replays, setReplays] = useState([])
  const [setAlert] = useAlert()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/comments/${commentID}/replays`, {withCredentials: true})
        //console.log('replays hhhh', response)
        setReplays(response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch comments'})
      }
    })()
  }, [])
  return (
    
    <div className="replays">
      {replays.length !== 0
        ? replays.map((replay) => <Comment key={replay._id} comment={replay} type='replay' />) 
        : <Loader msg='loading replays' sm />
      }
    </div>
  )
}

export default Replays