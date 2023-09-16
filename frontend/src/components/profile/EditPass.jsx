import { Link, useNavigate } from "react-router-dom"
import {useAlert} from '../../context/AlertProvider'
import { ChangePassValidation } from "../../utils/validation"
import axios from "axios"
import { useState } from "react"

const EditPass = () => {

  const [setAlert] = useAlert()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const formData = new FormData(e.currentTarget)
    const {oldpass, newpass} = Object.fromEntries(formData)
    try {
      await ChangePassValidation.validate({oldpass, newpass})
      const response = await axios.patch('http://127.0.0.1:4000/api/user/change-password', 
        {oldpass, newpass}, {withCredentials: true}
      )
      setAlert({text: response.data.message , type: 'success'})
      navigate('/profile', {replace: true})
    } catch (error) {
      const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.errors[0]
      setAlert({text: errorMsg, type: 'error'})
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="group glass">
        <input id="oldpass" name="oldpass" type="password" required />
        <label htmlFor="oldpass">current password</label>
      </div>
      <div className="group glass">
        <input id="newpass" name="newpass" type="password" required />
        <label htmlFor="newpass">new password</label>
      </div>
      <div className="flex justify-between items-center">
        <Link to='/profile'>Cancel</Link>
        <button disabled={sending} className="gradient">
          {sending ? 'changing' : 'change'}
        </button>
      </div>
    </form>
  )
}

export default EditPass