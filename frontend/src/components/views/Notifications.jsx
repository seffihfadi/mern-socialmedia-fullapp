import ConnectionRequests from "../ConnectionRequests"

const Notifications = () => {
  return (
    <div className="notifications">
      <h1 className="head_text text-xl">Notifications</h1>
      <ConnectionRequests />
      <div className='border-b-[1px] border-[#353535]'></div>
    </div>
  )
}

export default Notifications