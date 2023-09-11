import Connection from "../profile/Connection"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAlert } from "../../context/AlertProvider"
import Empty from "../Empty"
import ChatRoom from "./ChatRoom"
import { useRoom } from "../../context/RoomProvider"

const Conversations = () => {
  const activeRoom = useRoom()
  const session = useAuth()
  const [setAlert] = useAlert()
  const [rooms, setRooms] = useState([])
  const [creatingRoom, setCreatingRoom] = useState(false)

  useEffect(() => {
    if (creatingRoom) return
    (async function() {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/chat/', {withCredentials: true})
        setRooms(response.data)
        //console.log('response jjjjj', response)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [creatingRoom])

  const handleCreateRoom = async (connectionID, chatName) => {
    setCreatingRoom(true)
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/chat/add-room',
        {connectionID, chatName}, {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    } finally {
      setCreatingRoom(false)
    }
  }

  return (
    <div className="left">
      {session.connections.length > 0 &&
      <>
        <h1 className="head_text">connections</h1>
        <div className="flex overflow-x-auto">
          <div onClick={() => {}} className="mx-2 cursor-pointer">
            <div className="flex rounded-full border-2 border-[#353535] justify-center items-center w-14 h-14">
              <i className="uil uil-plus"></i>
            </div>
            <h1 className="capitalize text-center">Group</h1>
          </div>
          {session.connections.map((connection) => 
          <div key={connection._id} onClick={() => {handleCreateRoom(connection._id, connection.fullname)}} className="mx-2 cursor-pointer">
            <div className="img w-14 h-14">
              <img className="w-full  rounded-full h-full object-cover" src={connection.image} alt={connection.fullname} />
            </div>
            <h1 className="capitalize text-center">{connection.fullname.split(" ")[0]}</h1>
          </div>
          )}
        </div>
      </>
      }

      <h1 className="head_text">contacts</h1>
      {rooms.length > 0 ?
        rooms.map((room) => (
          <ChatRoom 
            key={room._id} 
            isActive={activeRoom._id === room._id} 
            room={room} 
          />
        ))
      :
        <Empty icon="at" type="lg" text="Unlock the potential of your network! Start by forging meaningful connections and reaching out to contacts." />
      }

    </div>
  )
}

export default Conversations