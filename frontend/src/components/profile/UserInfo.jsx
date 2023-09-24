import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import AddConnection from "../Buttons/AddConnection"

const UserInfo = ({ user }) => {
  const session = useAuth()
  const isMyProfile = session._id === user._id
  console.log('user', user)
  
  return (
    <div className="user-info component flex flex-wrap-reverse justify-around items-center md:gap-6">
      <div className="md:max-w-md lg:max-w-sm">
        <h1 className="capitalize text-3xl font-bold">{user.fullname}</h1>
        {user.slogan && <span className="font-semibold">({user.slogan})</span>}
        <p className="text-gray-500 my-3">{user.email}</p>
        {user.bio && <p className="text-gray-500 my-3">{user.bio}</p>}
      </div>
      <div className={`user_img my-6 relative ${user.isActive ? 'user_active' : ''}`}>
        <img className="w-64 h-64 object-cover rounded-full" src={user.image} alt="user-img" />
        <div className="absolute -bottom-5 flex w-full">
        {
          isMyProfile &&
          <Link to='/profile/edit'>
            <i className="uil uil-pen"></i>
          </Link>
        }
        </div>
        <div className="connex">
          {user.connections.slice(-2).map((con, i) => <img key={i} src={con.image} alt={con.fullname} />)}
        </div>
      </div>
    </div>
  )
}

export default UserInfo