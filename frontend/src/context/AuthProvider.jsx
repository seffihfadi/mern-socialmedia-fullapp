import { useState, useLayoutEffect, useContext, createContext } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useAlert } from "./AlertProvider"

import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000', {transports: ['websocket']})

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)[0]
}

export const useSocket = () => {
  return useContext(AuthContext)[1]
}

const AuthProvider = ({children}) => {
  const [setAlert] = useAlert()
  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/user/getuser', { withCredentials: true })
        if (!!response.data.user) {
          setUser(response.data.user)
          socket.emit('user-connected', response.data.user._id)
        }
      } catch (error) {
        //setRedirect(true)
        setAlert({type: 'error', text: error.response.data.message})
        setRedirect(true)
      }
    }
    getUser()

    return () => {
      socket.disconnect()
    }
  }, [])

  if (redirect) return <Navigate to='signin' replace={true} />
  return (
    <AuthContext.Provider value={[user, socket]} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
