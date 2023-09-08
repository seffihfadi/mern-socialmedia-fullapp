import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "../context/AlertProvider"
import { SignUpValidation } from "../utils/validation"
import axios from 'axios'

const Signup = () => {
  const [setAlert] = useAlert()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  // display image
  const [selectedImages, setSelectedImages] = useState([])
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file])
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false,  accept: {
    'image/jpeg': ['.jpeg', '.png', '.jpg']
  }})


  // submit
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setLoading(true)
    const formData = new FormData(ev.currentTarget)
    formData.append("image", selectedImages[0])
    const {email, password, fullname, image} = Object.fromEntries(formData)
    try {
      await SignUpValidation.validate({password, email, fullname, image})
      const response = await axios.post('http://127.0.0.1:4000/api/user/signup', 
        formData, {withCredentials: true}
      )
      setAlert({text: response.data.message, type: 'success'})
      ev.target.reset()
      navigate('/', {replace: true})

    } catch (error) {
      console.log('error', error)
      const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.errors[0]
      setAlert({text: errorMsg, type: 'error'})
    } finally {
      setLoading(false)
      
    }
  }

  return (
    <div className="sign">
      <div className="video flex-shrink-0">
        <video className="h-screen object-cover" src="/signin.mp4" muted loop autoPlay></video>
        <div className="absolute top-6 left-4">
          <img className="w-24" src="/logo.svg" alt="" />
        </div>
      </div>
      <div className="const"></div>
      <div className="flex w-full justify-center items-center">
        <div className="md:w-[350px] w-full max-w-md p-6 md:px-0">
          <div className="flex flex-col items-center mb-10">
            <img className="w-28 md:hidden" src="/logo-black.svg" alt="" />
            <h1 className="head_text text-3xl">sign up</h1>
            <p className="text-gray-500 text-center">Join a community, connect, share, and engage with others through posts and reactions.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="group">
              <input id="fullname" name="fullname" type="text" required />
              <label htmlFor="fullname">full name</label>
            </div>
            <div className="group">
              {selectedImages.length > 0 ? (
                <div className="user_img relative mx-auto">
                  <img className="object-cover w-64 aspect-square rounded-full" src={`${URL.createObjectURL(selectedImages[0])}`} alt="" />
                </div>
              ) : (
              <div {...getRootProps()} className="mx-auto w-[70%] aspect-square rounded-full border-gray-500 border-2 border-dashed flex justify-center items-center">
                <input name="image" {...getInputProps()} />
                <p className="text-gray-500 text-center">
                  {isDragActive ? 'Drop image here ...' : 'Drag and drop image here, or click to select'}
                </p>
              </div>
              )}
            </div>
            <div className="group">
              <input id="email" name="email" type="email" required />
              <label htmlFor="email">gmail</label>
            </div>
            <div className="group">
              <input id="password" name="password" type="password" required />
              <label htmlFor="password">password</label>
            </div>
            <div className="flex justify-between items-center">
              <Link to='/signin'>Or Sign In</Link>
              <button disabled={loading}>sign up {loading && '...'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup