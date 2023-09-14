import Conversation from "../components/chat/Conversation"
import ConversationOptions from "../components/chat/ConversationOptions"
import Conversations from "../components/chat/Conversations"
import RoomProvider from "../context/RoomProvider"


const Chat = () => {
  return (
    <div className="chat">
      <RoomProvider>
        <Conversations />
        <Conversation />
        <ConversationOptions />
      </RoomProvider>
    </div>
  )
}

export default Chat