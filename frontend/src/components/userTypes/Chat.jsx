
const Chat = () => {
  return (
    <>
      <div className="img flex-shrink-0">
        <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
      </div>
      <div className="flex flex-col">
        <h3 className="capitalize">ahmed elsayed</h3>
        <div className="flex box-border text-gray-500 gap-2 max-w-full">
          <span className="text-ellipsis whitespace-nowrap max-w-[60%] overflow-hidden">hi seffih whasapp giids</span>&bull;
          <span>12:30</span>
        </div>
      </div>
    </>
  )
}

export default Chat