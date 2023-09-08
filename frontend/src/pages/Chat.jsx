import Connection from "../components/profile/Connection"
import { useAuth } from "../context/AuthProvider"
import Conversation from "../components/chat/Conversation"
import ConversationOptions from "../components/chat/ConversationOptions"
import Conversations from "../components/chat/Conversations"

const Chat = () => {
  const user = useAuth()
  return (
    <div className="chat">
      <Conversations />
      <Conversation />
      <ConversationOptions />
    </div>
  )
}

export default Chat