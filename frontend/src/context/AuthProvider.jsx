import { useState, useLayoutEffect, useContext, createContext } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useAlert } from "./AlertProvider"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [setAlert] = useAlert()
  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/user/getuser', { withCredentials: true })
        //console.log('response', response)
        if (!!response.data.user) {
          setUser(response.data.user)
          console.log('response.data.user', response.data.user)
        }
      } catch (error) {
        //setRedirect(true)
        setAlert({type: 'error', text: error.response.data.message})
        setRedirect(true)
      }
    }
    getUser()
  }, [])

  if (redirect) return <Navigate to='signin' replace={true} />
  return (
    <AuthContext.Provider value={user} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
