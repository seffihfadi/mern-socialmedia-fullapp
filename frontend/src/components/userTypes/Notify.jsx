import { Link } from "react-router-dom"
import TimeAgo from 'react-timeago'

const Notify = ({ user, msg }) => {
  return (
    <Link className="flex items-center gap-3" to={`/profile/${user._id}`}>
      <div className="img flex-shrink-0">
        <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
      </div>
      <div className="flex flex-col">
        <p><p className="capitalize font-semibold inline">{user.fullname}</p>{' '}{msg} &bull; <span><TimeAgo date={user.createdAt} /></span></p>
      </div>
    </Link>
  )
}

export default Notify