import Conversations from "../components/chat/Conversations"
import Room from "../components/chat/Room"
import RoomProvider from "../context/RoomProvider"


const Chat = () => {
  return (
    <div className="chat">
      <RoomProvider>
        <Conversations />
        <Room />
      </RoomProvider>
    </div>
  )
}

export default Chat