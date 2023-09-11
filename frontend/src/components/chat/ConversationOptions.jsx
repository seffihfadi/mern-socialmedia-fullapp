import {useRoom} from '../../context/RoomProvider'
import ChatRoom from './ChatRoom'


const ConversationOptions = () => {
  const room = useRoom()
  return (
    <div className="right">
      <ChatRoom room={room} type='lg' />
      <div className="control">
        <h1 className="head_text">Controls</h1>
        <div className="control_btns">
          {/* <button><i className="uil uil-user"></i>View Profile</button> */}
          <button><i className="uil uil-envelope-search"></i>Search In Conversation</button>
          <button><i className="uil uil-bell"></i>Notifications</button>
          <button><i className="uil uil-trash-alt"></i>Delete Conversation</button>
          <button><i className="uil uil-ban"></i>Block User</button>
        </div>
        <h1 className="head_text">Shared Elementes</h1>
        <div className="scroll-y-auto grid grid-cols-3 gap-1">
          <div className="col-span-1 aspect-square">
            <img className="w-full h-full object-cover" src="/bg3.jpg" alt="" />
          </div>
          <div className="col-span-1 aspect-square">
            <img className="w-full h-full object-cover" src="/bg.jpg" alt="" />
          </div>
          <div className="col-span-1 aspect-square">
            <img className="w-full h-full object-cover" src="/bg2.jpg" alt="" />
          </div>
          <div className="col-span-1 aspect-square">
            <img className="w-full h-full object-cover" src="/bg4.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationOptions