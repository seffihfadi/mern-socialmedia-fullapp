import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { useAlert } from "../../context/AlertProvider"
import { useAuth } from "../../context/AuthProvider"
import TimeAgo from 'react-timeago'
import Empty from "../Empty"
import Loader from "../Loader"
import { useRoom, useNewMsg } from "../../context/RoomProvider"

const Messages = () => {
  const {_id: roomID} = useRoom()
  const user = useAuth()
  const [setAlert] = useAlert()
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useNewMsg()
  
  const chatContainerRef = useRef()
  
  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/messages/${roomID}`, {withCredentials: true})
        //console.log('response messages', response)
        setMessages(response.data)

      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [roomID])



  useEffect(() => {
    if (!newMessage.content) return
    setMessages([...messages, newMessage])
  }, [newMessage.content])

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }
    scrollToBottom()
  }, [messages])


  if(!messages) return <Loader sm msg='loading' />
  if (messages.length < 1) return <Empty icon="comments-alt" text="the conversation is empty" />
  return (
    <div ref={chatContainerRef} className="msgs h-full overflow-y-auto px-6">
      {messages.map((message) => 
      message.sender._id === user._id ? (
        <div key={message._id} className="msg me">
          <div className="in sendin text-center">
            <span><TimeAgo date={message.createdAt} /></span>
          </div>
          <div className="flex flex-row-reverse gap-2">
            <div className="text">
              <p>{message.content}</p>
            </div>
          </div>
          <div className="in seenin">
            <span>seen 15:30</span>
          </div>
        </div>
      )
      :
      (
        <div key={message._id} className="msg">
          <div className="in sendin text-center">
            <span><TimeAgo date={message.createdAt} /></span>
          </div>
          <div className="flex gap-2">
            <div className="flex">
              <img className="w-8 h-8 object-cover mt-auto rounded-full" src={message.sender.image} alt="" />
            </div>
            <div className="text">
              <p>{message.content}</p>
            </div>
          </div>
          <div className="in seenin">
            <span>seen 15:30</span>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Messages