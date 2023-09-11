import { Link } from "react-router-dom"
import TimeAgo from "react-timeago"

const Chat = ({ 
  user, 
  date, 
  roomID,
  lastMsg='conversation is empty', 
  type='sm',
  isActive = false
}) => {
  return (
    <>
      {type == 'lg' ?
      <Link to={`/profile/${user._id}`}>
        <div className="flex justify-center flex-col items-center">
          <div className="w-32 h-32">
            <img className="object-cover w-full h-full rounded-full"  src={user.image} alt={user.fullname} />
          </div>
          <div className="text-center mt-3">
            <h4 className="text-xl font-bold capitalize">{user.fullname}</h4>
            <span className="text-xs">Active 2 Hours ago</span>
          </div>
        </div>
      </Link>
      :
      <div className={`flex justify-between items-center my-5 max-w-sm connection ${isActive && 'active'}`}>
        <Link className="flex items-center gap-3" to={`/chat/${roomID}`}>
          <div className="img flex-shrink-0">
            <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
          </div>
          <div className="flex flex-col">
            <h3 className="capitalize">{user.fullname}</h3>
            <div className="flex box-border text-gray-500 gap-2 max-w-full">
              <span title={lastMsg} className="text-ellipsis whitespace-nowrap max-w-[40%] overflow-hidden">{lastMsg}</span>&bull;
              <span><TimeAgo date={date} /></span>
            </div>
          </div>
        </Link>
      </div>}
    </>
  )
}

export default Chat