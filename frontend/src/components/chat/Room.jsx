import Empty from "../Empty"
import Conversation from "../../components/chat/Conversation"
import ConversationOptions from "../../components/chat/ConversationOptions"
import { useRoom, useJoinRoom, useChatSocket } from "../../context/RoomProvider"
import { useAuth } from "../../context/AuthProvider"


import { useEffect } from "react"

const Room = () => {
  const room = useRoom()
  const socket = useChatSocket()
  const {fullname, _id} = useAuth()
  const [joinRoom, setJoinRoom] = useJoinRoom()
  useEffect(() => {
    socket.emit('joinChat', {room: room, user:{fullname, _id}})
    socket.on('leaveChat', () => {
      // console.log(data.user.fullname + ' leave all rooms ')
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