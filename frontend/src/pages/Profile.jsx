import UserInfo from "../components/profile/UserInfo"
import Connections from "../components/profile/Connections"
import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <div className="grid grid-cols-12 md:gap-8">
      <div className="col-span-12 lg:col-span-8">
        <h1 className="head_text">fadi's profile</h1>
        <UserInfo />
        <h1 className="head_text">posts</h1>
        <div className="box rounded-lg p-6 w-fit purple_gradient_bg">
          <h1 className="text-5xl">35</h1>
          <p className="font-bold my-5">shared<br /> post</p>
          <Link to='/add-post' className="ico text-sm text-gray-400 flex items-center gap-3">
            <i className="uil uil-focus-add text-sm"></i>
            <span>Add More</span>
          </Link>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 sticky top-0">
        <h1 className="head_text">connections</h1>
        <Connections />
      </div>
    </div>
  )
}

export default Profile