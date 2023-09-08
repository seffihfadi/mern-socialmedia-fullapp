import {useContext, createContext, useState, useEffect, useRef} from 'react'

const AlertContext = createContext()

export const useAlert = () => {
  return useContext(AlertContext)
}


const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null)
  const timerRef = useRef()

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setAlert(null)
    }, 5000)
  }, [alert])

  return (
    <AlertContext.Provider value={[setAlert, alert]}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider