import axios from "axios"
import { useState } from "react"
import { useAlert } from "../../context/AlertProvider"

const AddConnection = ({ requested=false, userID }) => {
  const [setAlert] = useAlert()
  const [sending, setSending] = useState(false)
  const [sended, setSended] = useState(requested)

  const handleAddConnection = async () => {
    setSending(true)
    setSended(prev => !prev)
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/connection-requests', 
        {receiverID: userID}, {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
      setSending(false)
    } catch (error) {
      setAlert({type: 'error', text: 'Connection requests are restricted for this person'})
    }
  }

  return (
    <button 
      disabled={sending} 
      onClick={(e) => {
        e.stopPropagation()
        handleAddConnection()
      }} 
      className={`addnotify ml-auto ${sended && 'sended'}`}
    >
      <i className="uil uil-user-plus"></i>
    </button> 
  )
}

export default AddConnection