import { useState, useEffect } from "react"
import axios from "axios"
import { useAlert } from "../context/AlertProvider"
import { useAuth } from "../context/AuthProvider"
import Empty from "./Empty"
import { Link } from "react-router-dom"
import TimeAgo from 'react-timeago'

const ConnectionRequests = () => {
  const user = useAuth()
  const [setAlert] = useAlert()
  const [requests, setRequests] = useState([])
  const [sending, setSending] = useState(false)
  const [sended, setSended] = useState(false)

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/connection-requests/${user._id}`, {withCredentials: true})
        //console.log('response', response)
        setRequests(response.data)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [])

  const handleConnectionResponse = async (resType, requestID) => {
    setSending(true)
    try {
      const response = await axios.put(`http://127.0.0.1:4000/api/connection-requests/${requestID}/${resType}`, null, {withCredentials: true})
      //console.log('response', response)
      setAlert({type: 'success', text: response.data.message})
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    } finally {
      setSending(false)
      setSended(true)
      
    }
  }

  if (requests.length < 1) return <Empty icon="user-square" text='Connection request appear here' />
  return (
    requests.map((request) => 
    <div key={request._id} className="flex my-2 flex-col">
      <Link className="flex items-center gap-3" to={`/profile/${request.requester._id}`}>
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
      {!sended &&
      <div className="action">
        <button disabled={sending} onClick={() => {handleConnectionResponse('reject', request._id)}}>
          <i className="uil uil-user-times"></i> reject
        </button>
        <button disabled={sending} onClick={() => {handleConnectionResponse('accept', request._id)}}>
          <i className="uil uil-user-check"></i> accept
        </button>
      </div>
      }
    </div>
    )
  )
}

export default ConnectionRequests