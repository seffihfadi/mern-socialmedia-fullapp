import { Link } from "react-router-dom"
import TimeAgo from 'react-timeago'

const Notify = ({ note }) => {
  return (
    <div className={`flex items-center my-4 gap-3 note relative ${!note.seen && 'active'}`}>

      <Link className="flex-shrink-0" to={`/profile/${note.from._id}`}>
        <div className="img">
          <img className="w-11 h-11 rounded-full object-cover" src={note.from.image} alt={note.from.fullname} />
        </div>
      </Link>
      <Link to={note.link}>
        <div className="flex flex-col">
          <p>
            <span className="capitalize font-semibold inline">
              {note.from.fullname}
            </span>
            {` ${note.note} ${note.count > 1 ? note.count + ' times ' : ''}`} &bull;
            <span className="text-gray-400 ml-1"><TimeAgo date={note.createdAt} /></span>
          </p>
        </div>
      </Link>
    
    </div>
  )
}

export default Notify