import axios from "axios"
import ChatRoom from "./ChatRoom"
import Messages from './Messages'
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useAlert } from "../../context/AlertProvider"

import { 
  useRoom, 
  useNewMsg, 
  useJoinRoom, 
  useChatSocket 
} from "../../context/RoomProvider"

const Conversation = () => {

  const room = useRoom()
  const user = useAuth()
  const [setAlert] = useAlert()
  const socket = useChatSocket()
  const [joinRoom] = useJoinRoom()
  const [msg, setMsg] = useState('')
  const [newMessage, setNewMessage] = useNewMsg()
  
  const handleSend = async (e) => {
    e.preventDefault()
    if (!msg) return

    const newMessageDoc = {
      _id: Date.now(),
      content: msg,
      room: room._id,
      createdAt: new Date(Date.now()),
      sender: {fullname: user.fullname, image: user.image, _id: user._id}, 
    }
    setNewMessage(newMessageDoc)
    setMsg('')
    socket.emit('new-message', newMessageDoc)
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/messages/insert-message', 
        {message: msg, roomID: room._id}, {withCredentials: true}
      )
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  useEffect(() => {
    socket.on('new-message-back', (msgBack) => {
      if (msgBack.sender._id !== user._id) {
        console.log('new-message-back', msgBack)
        setNewMessage(msgBack)
      }
    })
  }, [])
  
  return (
    <div className="center ldr_data">
      <div className="flex justify-between py-2 px-4">
        <ChatRoom key={room._id} room={room} one={true} isActive={joinRoom} />
        <div className="flex">
          <button><i className="uil uil-sliders-v"></i></button>
        </div>
      </div>
      <Messages />
      <div className="mt-auto py-2 px-4">
        <form onSubmit={handleSend} className="flex gap-3 items-center" noValidate>
          <div className="flex">
            <button><i className="uil uil-image"></i></button>  
          </div>
          <div className="relative w-full">
            <input
              autoComplete='off'
              value={msg} 
              onChange={(e) => setMsg(e.target.value)} 
              name="message" 
              className="glass" 
              type="text" 
              placeholder="Aa" 
              required
            />
            <img className="left-1 top-1 absolute w-8 h-8 rounded-full object-cover" src={user.image} alt={user.name} />
          </div>
          {msg.length > 0 &&
          <div className="flex">
            <button><i className="uil uil-message"></i></button>  
          </div>
          }
        </form>
      </div>
    </div>
  )
}

export default Conversation