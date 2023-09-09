import { Link } from "react-router-dom"
import Chat from "../userTypes/Chat"
import User from "../userTypes/User"
import Friend from "../userTypes/Friend"
import NotFriend from "../userTypes/NotFriend"
import Notify from "../userTypes/Notify"
//={fullname: 'ahmed elsayed', image: '/bg2.jpg', email: 'email@gamil.com'}
const Connection = ({ user, type, msg='' }) => {

  const generateUser = (type) => {

    switch (type) {
      case 'user':
        return <User user={user} />
        break
      case 'chat':
        return <Chat user={user} />
        break
      case 'notfriend':
        return <NotFriend user={user} />
        break
      case 'notify':
        return <Notify user={user} msg={msg} />
        break
      default:
        return <User user={user} />
        break
    }
  }

  return (
    <div className="flex justify-between items-center my-5 max-w-sm connection">
      { generateUser(type) }
    </div>
  )
}

export default Connection