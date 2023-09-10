import Conversation from "../components/chat/Conversation"
import ConversationOptions from "../components/chat/ConversationOptions"
import Conversations from "../components/chat/Conversations"
import RoomProvider from "../context/RoomProvider"
// import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react"
// import { useAlert } from "../context/AlertProvider"
// import axios from "axios"
// import Loader from "../components/Loader"


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