import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAlert } from "../context/AlertProvider"
import { useAuth } from "../context/AuthProvider"
import GlassModel from './GlassModel'
import { useState } from "react"

const Nav = () => {
  const user = useAuth()
  const [displayModel, setDisplayModel] = useState(false)
  const [modelType, setModelType] = useState('')
  const [setAlert] = useAlert()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/user/signout', { withCredentials: true })
      //console.log('responce', responce)
      if (response.status === 200) {
        setAlert({type: 'success', text: response.data.message})
        navigate('/signin', {replace: true})
      }
    } catch (error) {
      //console.log('error', error)
      setAlert({type: 'error', text: error.response.data.message})
    }
  }

  const handleModel = (e, type) => {
    e.currentTarget.classList.toggle('animate-pulse');
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
      <NavLink to='/chat'>
        <i className="uil uil-message"></i>
      </NavLink>
      <NavLink to='/explore'>
        <i className="uil uil-compass"></i>
      </NavLink>
      <NavLink to='/add-post'>
        <i className="uil uil-plus-circle"></i>
      </NavLink>
      <button onClick={(e) => {handleModel(e, 'search')}}>
        <i className="uil uil-search"></i>
      </button>
      <button onClick={(e) => {handleModel(e, 'notification')}}>
        <i className="uil uil-bell"></i>
      </button>
      <div className="md:mt-auto flex md:flex-col items-center w-full">
        <NavLink to='/profile'>
          <img className="rounded-full w-9 h-9 object-cover" src={user.image} alt={user.fullname} />
        </NavLink>
        <button onClick={handleSignOut} className="hidden md:flex">
          <i className="uil uil-signout"></i>
        </button>
      </div>
    </nav>
    <GlassModel displayed={displayModel} type={modelType} />
    </>

  )
}

export default Nav