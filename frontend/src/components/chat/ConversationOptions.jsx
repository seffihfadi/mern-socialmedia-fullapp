
const ConversationOptions = () => {
  return (
    <div className="right">
      <div className="flex justify-center flex-col items-center">
        <div className="w-32 h-32">
          <img className="object-cover w-full h-full rounded-full" src="/bg2.jpg" alt="" />
        </div>
        <div className="text-center mt-3">
          <h4 className="text-xl font-bold capitalize">Assil seffih</h4>
          <span className="text-xs">Active 2 Hours ago</span>
        </div>
      </div>
      <div className="control">
        <h1 className="head_text">Controls</h1>
        <div className="control_btns">
          <button><i className="uil uil-user"></i>View Profile</button>
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