import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useAlert } from "../context/AlertProvider"
import { SignInValidation } from "../utils/validation"


const Signin = () => {
  const [setAlert] = useAlert()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const {email, password} = Object.fromEntries(formData)
    try {
      await SignInValidation.validate({email, password})
      const response = await axios.post('http://127.0.0.1:4000/api/user/signin', 
        {email, password}, {withCredentials: true}
      )
      setAlert({text: response.data.message, type: 'success'})
      e.target.reset()
      navigate('/', {replace: true})
    } catch (error) {
      const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.errors[0]
      setAlert({text: errorMsg, type: 'error'})
    } finally {
      setLoading(false)
    }
  }


  return (
  <div className="sign">
    <div className="video flex-shrink-0">
      <video className="h-screen object-cover" src="/signup.mp4" muted loop autoPlay></video>
      <div className="absolute top-6 left-4">
        <img className="w-24" src="/logo.svg" alt="" />
      </div>
    </div>
    <div className="const"></div>
    <div className="flex w-full h-screen justify-center items-center">
      <div className="md:w-[350px] w-full max-w-md p-6 md:px-0">
        <div className="flex flex-col items-center mb-10">
          <img className="w-28 md:hidden" src="/logo-black.svg" alt="" />
          <h1 className="head_text text-3xl">sign in</h1>
          <p className="text-gray-500 text-center">
            Welcome Back To {' '}
            <span className="purple_gradient font-bold">Zoquix</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="group">
            <input id="email" name="email" type="email" required />
            <label htmlFor="email">email</label>
          </div>
          <div className="group">
            <input id="password" name="password" type="password" required />
            <label htmlFor="password">password</label>
          </div>
          <div className="flex justify-between items-center">
            <Link to='/signup'>Or Sign Up</Link>
            <button disabled={loading}>sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Signin