import { Link } from "react-router-dom"
const User = ({ user, span }) => {
  return (
    <>
      <Link className="flex items-center gap-3" to={`/profile/${user._id}`}>
        <div className="img flex-shrink-0">
          <img className="w-11 h-11 rounded-full object-cover" src={user.image} alt={user.fullname} />
        </div>
        <div className="flex flex-col">
          <h3 className="capitalize">{user.fullname}</h3>
          <span className="text-gray-500">{span}</span>
        </div>
      </Link>
    </>
  )
}

export default User