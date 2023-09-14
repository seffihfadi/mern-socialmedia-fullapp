import { Link, useOutletContext, useNavigate } from "react-router-dom"
import {useAlert} from '../../context/AlertProvider'
import { EditProfileValidation, ImageUploadValidation } from "../../utils/validation"
import axios from "axios"
import { useState } from "react"

const EditInfo = ({image}) => {
  const userProfile = useOutletContext()
  const [setAlert] = useAlert()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const formData = new FormData(e.currentTarget)
    const {fullname, slogan, bio} = Object.fromEntries(formData)
    try {
      await EditProfileValidation.validate({fullname, slogan, bio})
      if (!!image) {
        await ImageUploadValidation.validate([image])
      }
      const response = await axios.patch('http://127.0.0.1:4000/api/user/update', 
        {fullname, slogan, bio, image}, {withCredentials: true}
      )
      setAlert({text: response.data.message , type: 'success'})
      navigate('/profile', {replace: true})
    } catch (error) {
      console.log('error jjjj', error)
      const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.errors[0]
      setAlert({text: errorMsg, type: 'error'})
    } finally {
      setSending(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}  noValidate>
      <div className="group glass">
        <input defaultValue={userProfile.fullname} id="fullname" name="fullname" type="text" required />
        <label htmlFor="fullname">full name</label>
      </div>
      <div className="group glass">
        <input value={userProfile.email} disabled id="email" name="email" type="email" required />
        <label htmlFor="email">gmail</label>
      </div>
      <div className="group glass">
        <input defaultValue={userProfile.slogan} id="slogan" maxLength={20}  name="slogan" type="text" required />
        <label htmlFor="slogan">slogan</label>
      </div>  
      <div className="group glass">
        <textarea defaultValue={userProfile.bio} name="bio" id="bio" rows="3" maxLength={250} required></textarea>
        <label htmlFor="bio">biography</label>
      </div>
      <div className="flex justify-between items-center">
        <Link to='/profile'>Cancel</Link>
        <button disabled={sending} className="gradient">
          {sending ? 'saving' : 'save'}
        </button>
      </div>
    </form>
  )
}

export default EditInfo