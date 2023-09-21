import axios from "axios"
import Empty from "../Empty"
import Loader from "../Loader"
import ChatRoom from "./ChatRoom"
import { useState, useEffect } from "react"
import { useAlert } from "../../context/AlertProvider"
import { useAuth } from "../../context/AuthProvider"
import { useRoom, useNewMsg } from "../../context/RoomProvider"

const Conversations = () => {

  const session = useAuth()
  const activeRoom = useRoom()
  const [setAlert] = useAlert()
  const [newMessage] = useNewMsg()
  const [rooms, setRooms] = useState(null)
  const [creatingRoom, setCreatingRoom] = useState(false)

  useEffect(() => {
    if (creatingRoom) return
    (async function() {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/chat/', {withCredentials: true})
        setRooms(response.data)
        console.log('rooms', rooms)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [creatingRoom, newMessage._id])

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
            <h1 className="capitalize text-center text-sm">Group</h1>
          </div>
          {session.connections.map((connection) => 
          <div key={connection._id} onClick={() => {handleCreateRoom(connection._id, connection.fullname)}} className="mx-2 cursor-pointer">
            <div className="img w-14 h-14">
              <img className="w-full rounded-full h-full object-cover" src={connection.image} alt={connection.fullname} />
            </div>
            <h1 className="capitalize text-center text-sm">{connection.fullname.split(" ")[0]}</h1>
          </div>
          )}
        </div>
      </>
      }

      <h1 className="head_text">contacts</h1>
      <div className="ldr_data">
        {!rooms 
        ? <Loader sm msg='getting chats' /> 
        : rooms.length > 0 
        ? rooms.map((room) => (
            <ChatRoom 
              room={room} 
              key={room._id} 
              isActive={activeRoom._id === room._id} 
            />
          )) ///return seggesions not empty
        : <Empty icon="at" type="lg" text="Unlock the potential of your network! Start by forging meaningful connections and reaching out to contacts." />
        }
      </div>

    </div>
  )
}

export default Conversations