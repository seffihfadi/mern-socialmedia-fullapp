import { useAuth } from "../../context/AuthProvider"
import { Link } from "react-router-dom"
import AddConnection from "../Buttons/AddConnection"

const NotFriend = ({ user }) => {
  const {_id: sessionID} = useAuth()
  const isConnection = user.connections.filter((connection) => connection === sessionID).length > 0
  const isMe = user._id === sessionID

  return (
    <>
      <Link className="flex items-center gap-3" to={`/profile/${user._id}`}>
        <div className="img flex-shrink-0">
          <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
        </div>
        <div className="flex flex-col">
            <h3 className="capitalize">{user.fullname}</h3>
            <span className="text-gray-500">{isMe ? 'You' : user.email}</span>
        </div>
      </Link>
      {isConnection ? 
        <Link className="ml-auto text-gray-200" to={`/chat`}>
          <i className="uil uil-comment-lines"></i>
        </Link>
      : !isMe && <AddConnection userID={user._id} />
      }
    </>
  )
}

export default NotFriend