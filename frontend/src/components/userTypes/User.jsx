const User = () => {
  return (
    <>
      <div className="img flex-shrink-0">
        <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
      </div>
      <div className="flex flex-col">
        <h3 className="capitalize">ahmed elsayed</h3>
        <span className="text-gray-500">Active Now</span>
      </div>
    </>
  )
}

export default User