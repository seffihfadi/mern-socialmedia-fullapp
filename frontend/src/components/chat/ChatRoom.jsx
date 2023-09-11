import Chat from "../userTypes/Chat"
import { useAuth } from "../../context/AuthProvider"
const ChatRoom = ({ room, isActive, type }) => {
  //console.log('room', room)
  const session = useAuth()
  const chatInfos = room.users?.filter((user) => user._id !== session._id)[0]
  //console.log('chatInfos', chatInfos)
  return (
    <Chat 
      key={room._id} 
      user={chatInfos} 
      date={room.updatedAt} 
      roomID={room._id} 
      lastMsg={room?.latestMsg?.content} 
      isActive={isActive}
      type={type}
    />
  )
}

export default ChatRoom