import UserInfo from "../components/profile/UserInfo"
import Connections from "../components/profile/Connections"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAlert } from "../context/AlertProvider"
import axios from "axios"
import { useAuth } from "../context/AuthProvider"
import Loader from "../components/Loader"
import Empty from '../components/Empty'


const Profile = () => {
  const { userID } = useParams()
  const [setAlert] = useAlert()
  const [userProfile, setUserProfile] = useState([])
  const user = useAuth()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/user/${userID || user._id}`, {withCredentials: true})
        //console.log('response USER', response)
        setUserProfile(response.data)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [userID])

  if (userProfile.length < 1) return <Loader />
  return (
    <div className="grid grid-cols-12 gap-6 px-8 profile">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <h1 className="head_text">{userProfile.fullname}'s profile</h1>
        <UserInfo user={userProfile} />
        <h1 className="head_text">posts</h1>

        <div className="grid gap-4 grid-cols-12">
          <div className="box purple_gradient_bg">
            <h1>35</h1>
            <p>shared<br /> post</p>
            <Link to='/add-post'>
              <i className="uil uil-focus-add text-sm"></i>
              <span>Add More</span>
            </Link>
          </div>
          <div className="box bg-glass">
            <h1>{userProfile.connections.length}</h1>
            <p>connection</p>
            <Link to='/explore'>
              <i className="uil uil-user-plus text-sm"></i>
              <span>Add Connections</span>
            </Link>
          </div>
        </div>

      </div>
      <div className="col-span-12 xl:col-span-3 lg:col-span-4 hidden lg:block sticky top-0">
        <h1 className="head_text">connections</h1>
        <Connections user={userProfile} />
      </div>
    </div>
  )
}

export default Profile