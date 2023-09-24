import axios from "axios"
import Loader from "../components/Loader"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider"
import { useAlert } from "../context/AlertProvider"
import { Outlet, useParams } from "react-router-dom"


const Profile = () => {
  const { userID } = useParams()
  const [setAlert] = useAlert()
  const [userProfile, setUserProfile] = useState([])
  const user = useAuth()

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/user/${userID || user._id}`, 
          {withCredentials: true}
        )
        setUserProfile(response.data)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [userID])

  if (userProfile.length < 1) return <Loader msg='loading profile' />
  return (
    <div className="grid grid-cols-12 gap-8 px-8 profile">
      <Outlet context={userProfile} />
    </div>
  )
}

export default Profile