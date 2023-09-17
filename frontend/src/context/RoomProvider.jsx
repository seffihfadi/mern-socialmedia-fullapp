import { useParams } from "react-router-dom"
import { useEffect, useState, createContext, useContext } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import { useAuth } from "./AuthProvider"

const RoomContext = createContext()

export const useRoom = () => {
  return useContext(RoomContext)[0]
}

export const useNewMsg = () => {
  return useContext(RoomContext)[1]
}

const RoomProvider = ({children}) => {

  const user = useAuth()
  const { roomID } = useParams()
  const [room, setRoom] = useState(null)
  const [newMessage, setNewMessage] = useState({
    content: '',
    createdAt: new Date(Date.now()),
    _id: Math.random().toString(),
    sender: user, 
    room: ''
  })
  //const [setAlert] = useAlert()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/chat/${roomID}`, {withCredentials: true})
        setRoom(response.data)
        console.log('response room prov', response)
      } catch (error) {
        console.log('RoomError', error)
        //setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [roomID])


  if(room == null) return <Loader msg='wating for room' />
  return (
    <RoomContext.Provider value={[room, [newMessage, setNewMessage]]}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider