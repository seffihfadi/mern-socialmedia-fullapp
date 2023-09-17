import Empty from "../Empty"
import Conversation from "../../components/chat/Conversation"
import ConversationOptions from "../../components/chat/ConversationOptions"
import { useRoom } from "../../context/RoomProvider"

const Room = () => {
  const room = useRoom()
  if (Object.keys(room).length === 0) return <Empty icon="at" type="lg" text="Unlock the potential of your network! Start by forging meaningful connections and reaching out to contacts." />
  return (
    <>
      <Conversation />
      <ConversationOptions />
    </>
  )
}

export default Room