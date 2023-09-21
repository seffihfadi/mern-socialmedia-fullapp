import axios from "axios"
import { useState, useEffect } from "react"
import NotFriend from "../userTypes/NotFriend"



const ProfileViews = () => {
  const [profileViews, setProfileViews] = useState(null)

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/user/views`,
          {withCredentials: true}
        )
        console.log('response.data views', response.data)
        setProfileViews(response.data)
      } catch (error) {
        console.log('error profileViews', error)
        setAlert({type: 'error', text: 'can not get profileViews'})
      }
    })()
  }, [])

  return (
    <div className="connections overflow-y-auto">
      {profileViews && profileViews.map((connection, i) => 
        <NotFriend key={i} user={connection} />
      )}
    </div>
  )
}

export default ProfileViews