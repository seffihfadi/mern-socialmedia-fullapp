import UserInfo from "./UserInfo"
import Connections from "./Connections"
import { Link, useOutletContext } from "react-router-dom"
import { tagName } from "../../utils/code"
import { useState } from "react"
import Feed from '../../components/home/Feed'
import { useAuth } from "../../context/AuthProvider"

const ProfilePage = () => {
  const userProfile = useOutletContext()
  const {_id: sessionID} = useAuth()
  const isMyProfile = userProfile._id === sessionID


  const [postsCount, setPostsCount] = useState(0)
  return (
    <>
      <div className="col-span-12 xl:col-span-9">
        <h1 className="head_text">{tagName(userProfile.fullname)} profile</h1>
        <UserInfo user={userProfile} />
        <h1 className="head_text">account</h1>
        <div className="grid gap-4 grid-cols-12">
          <div className="box purple_gradient_bg">
            <h1>{postsCount}</h1>
            <p>shared<br /> post</p>
            {isMyProfile &&
              <Link to='/post/add'>
                <i className="uil uil-focus-add text-sm"></i>
                <span>Add More</span>
              </Link>
            }
          </div>
          <div className="box bg-glass">
            <h1>52</h1>
            <p>profile<br /> views</p>
          </div>
          <div className="box bg-glass">
            <h1>{userProfile.connections.length}</h1>
            <p>connection</p>
            {isMyProfile &&
              <Link to='/explore'>
                <i className="uil uil-user-plus text-sm"></i>
                <span>Add Connections</span>
              </Link>
            }
          </div>
        </div>
        <div className="col-span-12 xl:col-span-9 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <h1 className="head_text">posts</h1>
            <div className="ldr_data">
              <Feed userID={userProfile._id} setPostsCount={setPostsCount}  />
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-4">
            <div className="sticky top-4">
              <h1 className="head_text">suggestions</h1>
              <Connections user={userProfile} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden xl:block xl:col-span-3 relative">
        <div className="sticky top-4">
          <h1 className="head_text">connections</h1>
          <Connections user={userProfile} />
        </div>
      </div>
    </>
  )
}

export default ProfilePage