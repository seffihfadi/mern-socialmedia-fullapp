import axios from "axios"
import Empty from "../Empty"
import Loader from "../Loader"
import TimeAgo from 'react-timeago'
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useAlert } from "../../context/AlertProvider"
import { useRoom, useNewMsg } from "../../context/RoomProvider"

const Messages = () => {

  const user = useAuth()
  const [setAlert] = useAlert()
  const {_id: roomID} = useRoom()
  const chatContainerRef = useRef()
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useNewMsg()
  
  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/messages/${roomID}`, 
          {withCredentials: true}
        )
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


  const handleDeleteMessage = async (messageID) => {
    const updatedMessages = messages.filter((message) => message._id !== messageID)
    setMessages(updatedMessages)
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/api/messages/${messageID}/delete`, 
        {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
    } catch (error) {
      setAlert({type: 'error', text: 'we can not delete this message'})
    }
  
  }


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
            <button onClick={() => handleDeleteMessage(message._id)}>
              <i className="uil uil-trash-alt text-[15px]"></i>
            </button>
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