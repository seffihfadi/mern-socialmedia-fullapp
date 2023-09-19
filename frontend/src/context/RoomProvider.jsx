import { useParams } from "react-router-dom"
import { useEffect, useState, createContext, useContext } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import { useAuth } from "./AuthProvider"

import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000', {transports: ['websocket']})

const RoomContext = createContext()

export const useRoom = () => {
  return useContext(RoomContext)[0]
}

export const useNewMsg = () => {
  return useContext(RoomContext)[1]
}

export const useJoinRoom = () => {
  return useContext(RoomContext)[2]
}
export const useChatSocket = () => {
  return useContext(RoomContext)[3]
}

const RoomProvider = ({children}) => {
  
  const user = useAuth()
  const { roomID } = useParams()
  const [room, setRoom] = useState(null)
  const [joinRoom, setJoinRoom] = useState(false)
  const [newMessage, setNewMessage] = useState({})
  
  
  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/chat/${roomID}`, {withCredentials: true})
        setRoom(response.data)
      } catch (error) {
        console.log('RoomError', error)
      }
    })()
  }, [roomID])
  
  
  
  if(room == null) return <Loader msg='wating for room' />
  return (
    <RoomContext.Provider 
      value={[
        room, 
        [newMessage, setNewMessage],
        [joinRoom, setJoinRoom], 
        socket
      ]}>
        {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider