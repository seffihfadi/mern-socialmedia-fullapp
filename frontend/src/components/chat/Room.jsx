import Empty from "../Empty"
import Conversation from "../../components/chat/Conversation"
import ConversationOptions from "../../components/chat/ConversationOptions"

import { useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useRoom, useJoinRoom, useChatSocket } from "../../context/RoomProvider"

const Room = () => {
  const room = useRoom()
  const {_id} = useAuth()
  const socket = useChatSocket()
  const [joinRoom, setJoinRoom] = useJoinRoom()
  
  useEffect(() => {
    socket.emit('joinChat', {room: room, user:{_id}})
    socket.on('leaveChat', () => {
      setJoinRoom(false)
    })
    socket.on('joined', () => {
      setJoinRoom(true)
    })
  }, [room._id])


  if (Object.keys(room).length === 0) return <Empty icon="at" type="lg" text="Unlock the potential of your network! Start by forging meaningful connections and reaching out to contacts." />
  return (
    <>
      <Conversation />
      <ConversationOptions />
    </>
  )
}

export default Room