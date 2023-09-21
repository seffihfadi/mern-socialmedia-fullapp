import Chat from "../userTypes/Chat"
import { useAuth } from "../../context/AuthProvider"
import { useNewMsg } from "../../context/RoomProvider"

const ChatRoom = ({ room, isActive, type, one }) => {
  //console.log('room', room)
  const session = useAuth()
  const [newMessage] = useNewMsg()
  const chatInfos = room.users?.filter((user) => user._id !== session._id)[0]
  const lstMsg = newMessage.room === room._id ? newMessage.content : room.latestMsg?.content
  const lstMsgDate = newMessage.room === room._id ? newMessage.createdAt : room.updatedAt

  return (
    <Chat 
      key={room._id} 
      user={chatInfos} 
      date={lstMsgDate} 
      roomID={room._id} 
      lastMsg={lstMsg} 
      isActive={isActive}
      type={type}
      one={one}
    />
  )
}

export default ChatRoom