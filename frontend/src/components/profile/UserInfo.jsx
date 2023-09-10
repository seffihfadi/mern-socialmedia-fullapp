import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"

const UserInfo = ({ user }) => {
  const session = useAuth()
  const isMyProfile = session._id === user._id
  //console.log('user profiles', user)
  return (
    <div className="user-info component flex flex-wrap-reverse justify-around items-center md:gap-6">
      <div className="max-w-sm">
        <h1 className="capitalize text-3xl font-bold">{user.fullname}</h1>
        <span className="font-bold">web developer</span>
        <p className="text-gray-500 my-3">{user.email}</p>
        <p className="text-gray-500 my-3">{user.bio} amet consectetur adipisicing elit orem ipsum dolor sit.adipisicing elit orem ipsum dolor sit Ipsum eos saepe libero. Temporibus quasi.</p>
      </div>
      <div className="user_img my-6 relative">
        <img className="w-64 h-64 object-cover rounded-full" src={user.image} alt="user-img" />
        {isMyProfile &&
          <div className="absolute -bottom-5 flex w-full">
            <Link to='/edit-profile' className="purple_gradient_bg mx-auto flex justify-center items-center rounded-full h-10 w-10">
              <i className="uil uil-pen text-white text-[20px]"></i>
            </Link>
          </div>
        }
        <div className="connex">
          <img src="/bg.jpg" alt="" />
          <img src="/bg4.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default UserInfo