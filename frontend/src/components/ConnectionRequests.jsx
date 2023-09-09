import { useState, useEffect } from "react"
import axios from "axios"
import { useAlert } from "../context/AlertProvider"
import { useAuth } from "../context/AuthProvider"
import Connection from "./profile/Connection"
import { Link } from "react-router-dom"
import TimeAgo from 'react-timeago'

const ConnectionRequests = () => {
  const user = useAuth()
  const [setAlert] = useAlert()
  const [requests, setRequests] = useState([])
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/connection-requests/${user._id}`, {withCredentials: true})
        console.log('response', response)
        setRequests(response.data)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [])

  //if (requests.length < 1) return null
  return (
    requests.map((request) => 
    <div className="flex flex-col">

      <Link key={request._id} className="flex items-center gap-3" to={`/profile/${request.requester._id}`}>
        <div className="img flex-shrink-0">
          <img className="w-11 h-11 rounded-full object-cover" src={request.requester.image} alt={request.requester.fullname} />
        </div>
        <div className="flex flex-col">
          <p>
            <span className="capitalize font-semibold">{request.requester.fullname}</span>{' '}
            send a connection request {' '} &bull; {' '}
            <span><TimeAgo date={request.createdAt} /></span>
          </p>
        </div>
      </Link>
      <div className="action">
        <button>accept</button>
        <button>reject</button>
      </div>
    </div>
    )
  )
}

export default ConnectionRequests