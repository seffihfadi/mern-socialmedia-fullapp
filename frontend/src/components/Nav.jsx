import axios from "axios"
import GlassModel from './GlassModel'

import { useState } from "react"
import { useAlert } from "../context/AlertProvider"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth, useSocket } from "../context/AuthProvider"

const Nav = () => {
  const user = useAuth()
  const socket = useSocket()
  const [setAlert] = useAlert()
  const navigate = useNavigate()
  const [modelType, setModelType] = useState('')
  const [displayModel, setDisplayModel] = useState(false)

  const handleSignOut = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/user/signout', { withCredentials: true })
      if (response.status === 200) {
        
        socket.disconnect()
        setAlert({type: 'success', text: response.data.message})
        navigate('/signin', {replace: true})
      }
    } catch (error) {
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  const handleModel = (e, type) => {
    // e.currentTarget.classList.toggle('animate-pulse');
    setDisplayModel(!(type === modelType && displayModel))
    setModelType(type)
  }

  return (
    <>
    <nav className="flex md:flex-col items-center md:py-5">
      <div className="md:mb-8 hidden md:flex">
        <img src="/logo-black.svg" alt="LOGO" />
      </div>
      <NavLink to='/'>
        <i className="uil uil-estate"></i>
      </NavLink>
      <NavLink num={5} to='/chat'>
        <i className="uil uil-message"></i>
      </NavLink>
      <NavLink to='/explore'>
        <i className="uil uil-compass"></i>
      </NavLink>
      <NavLink to='/post/add'>
        <i className="uil uil-plus-circle"></i>
      </NavLink>
      <button onClick={(e) => {handleModel(e, 'search')}}>
        <i className="uil uil-search"></i>
      </button>
      <button num={9} onClick={(e) => {handleModel(e, 'notification')}}>
        <i className="uil uil-bell"></i>
      </button>
      <div className="md:mt-auto flex md:flex-col items-center w-full">
        <NavLink to='/profile'>
          <img className="rounded-full w-9 h-9 object-cover" src={user.image} alt={user.fullname} />
        </NavLink>
        <button onClick={handleSignOut} className="hidden md:block">
          <i className="uil uil-signout"></i>
        </button>
      </div>
    </nav>
    <GlassModel displayed={displayModel} type={modelType} setDisplayModel={setDisplayModel} />
    </>
  )
}

export default Nav