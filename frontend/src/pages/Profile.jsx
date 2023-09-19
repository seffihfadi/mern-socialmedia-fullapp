import { Outlet, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAlert } from "../context/AlertProvider"
import axios from "axios"
import { useAuth } from "../context/AuthProvider"
import Loader from "../components/Loader"


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

  if (userProfile.length < 1) return <Loader msg='loading profile' />
  return (
    <div className="grid grid-cols-12 gap-8 px-8 profile">
      <Outlet context={userProfile} />
    </div>
  )
}

export default Profile