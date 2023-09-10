import { useParams } from "react-router-dom"
import { useEffect, useState, createContext, useContext } from "react"
import axios from "axios"
import Loader from "../components/Loader"

const RoomContext = createContext()

export const useRoom = () => {
  return useContext(RoomContext)
}

const RoomProvider = ({children}) => {

  const { roomID } = useParams()
  const [room, setRoom] = useState([])
  //const [setAlert] = useAlert()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/chat/${roomID}`, {withCredentials: true})
        setRoom(response.data)
      } catch (error) {
        console.log('RoomError', error)
        //setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [roomID])


  if(room.length < 1) return <Loader msg='wating for room' />
  return (
    <RoomContext.Provider value={room}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider