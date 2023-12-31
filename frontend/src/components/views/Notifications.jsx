import axios from "axios"
import Loader from '../Loader'
import Notify from "../userTypes/Notify"
import ConnectionRequests from "../ConnectionRequests"

import { useState, useEffect } from "react"
import { useAlert } from "../../context/AlertProvider"


const Notifications = () => {
  const [setAlert] = useAlert()
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/notifications/', {withCredentials: true})
        setNotification(response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not fetch notifications'})
      }
    })()
  }, [])

  return (
    <div className="notifications">
      <h1 className="head_text text-xl">Notifications</h1>
      <ConnectionRequests />
      <div className='border-b-[1px] border-[#353535]'></div>
      <div className="ldr_data">
        {!notification ? <Loader sm msg='get notifications' /> :
          notification.map((note, i) => <Notify key={i} note={note} />)
        }
      </div>
    </div>
  )
}

export default Notifications