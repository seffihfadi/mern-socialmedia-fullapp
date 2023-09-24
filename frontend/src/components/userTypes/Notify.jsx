import axios from "axios";
import TimeAgo from 'react-timeago'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider";

const Notify = ({ note }) => {
  const navigate = useNavigate()
  const {_id: sessionID} = useAuth()

  function noteCount(inputString, count) {
    const regex = /#num#/;
    if (count == 1) {
      return inputString.replace(regex, "a")
    }else{
      return inputString.replace(regex, count)
    }
  }

  const handleSeenNote = async (note) => {
    try {
      if (!note.seen) {
        await axios.patch('http://127.0.0.1:4000/api/notifications/seen', 
          {note: note.note, from: note.from._id, to: sessionID}, 
          {withCredentials: true}
        )
      }
      } catch (error) {
        console.log('error', error)
      } finally {
        navigate(note.link, {replace: true})
      }
  }
  // console.log('note', note)

  return (
    <div className={`flex items-center my-4 gap-3 note relative ${!note.seen && 'active'}`}>

      <Link className="flex-shrink-0" to={`/profile/${note.from._id}`}>
        <div className="img">
          <img className="w-11 h-11 rounded-full object-cover" src={note.from.image} alt={note.from.fullname} />
        </div>
      </Link>
      <button className="text-start" onClick={() => handleSeenNote(note)}>
        <div className="flex flex-col">
          <p>
            <span className="capitalize font-semibold inline">
              {note.from.fullname}
            </span>
            {` ${noteCount(note.note, note.count)}`} &bull;
            <span className="text-gray-400 ml-1"><TimeAgo date={note.createdAt} /></span>
          </p>
        </div>
      </button>
    
    </div>
  )
}

export default Notify