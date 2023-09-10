import { useAuth } from "../../context/AuthProvider"
import ChatRoom from "./ChatRoom"
import Messages from './Messages'
import Loader from '../Loader'
import { useState } from "react"
import { useAlert } from "../../context/AlertProvider"
import axios from "axios"
import { useRoom } from "../../context/RoomProvider"

const Conversation = () => {
  const room = useRoom()
  const user = useAuth()
  const [setAlert] = useAlert()
  const [msg, setMsg] = useState('')

  const handleSend = async (e) => {
    e.preventDefault()
    const message = msg
    setMsg('')
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/messages/insert-message', 
        {message: msg, roomID: room._id}, {withCredentials: true}
      )
      console.log('response', response)
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }

  }

  return (
    <div className="center">
      <div className="flex justify-between py-2 px-4">
        <ChatRoom key={room._id} room={room} />
        <div className="flex">
          <button><i className="uil uil-sliders-v"></i></button>
        </div>
      </div>

      <Messages roomID={room._id} />
      <div className="mt-auto py-2 px-4">
        <form className="flex gap-3 items-center" noValidate>
          <div className="flex">
            <button><i className="uil uil-image"></i></button>  
          </div>
          <div className="relative w-full">
            <input 
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
            <button onClick={handleSend}><i className="uil uil-message"></i></button>  
          </div>
          }
        </form>
      </div>
    </div>
  )
}

export default Conversation