import axios from "axios"
import { useAlert } from "../../context/AlertProvider"
import { useState } from "react"

const AddConnection = ({ userID }) => {
  const [setAlert] = useAlert()
  const [sending, setSending] = useState(false)

  const handleAddConnection = async () => {
    setSending(true)
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/connection-requests', 
        {receiverID: userID}, {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
      setSending(false)
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  return (
    <button disabled={sending} onClick={handleAddConnection} className='ml-auto'>
      <i className="uil uil-user-plus"></i>
    </button> 
  )
}

export default AddConnection