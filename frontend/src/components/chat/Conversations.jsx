
import Connection from "../profile/Connection"

const Conversations = () => {
  return (
    <div className="left">
      <h1 className="head_text">active contacts</h1>
      <div className="flex">
        <div className="user">
          <div className="img w-14 h-14">
            <img className="w-full  rounded-full h-full object-cover" src="/bg2.jpg" alt="" />
          </div>
          <h1 className="capitalize text-center">fadi</h1>
        </div>
      </div>
      <h1 className="head_text">contacts</h1>
      <Connection type='chat' />
      <Connection type='chat' />
      <Connection type='chat' />
    </div>
  )
}

export default Conversations