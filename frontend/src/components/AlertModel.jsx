import { useAlert } from "../context/AlertProvider"

const AlertModel = () => {
  const [,alert] = useAlert()
  if(!alert) return null
  return (
    <div className={`alert ${alert.type}`}>
      {alert.type === 'error' ?
        <i className="uil uil-exclamation-octagon"></i>
        : 
        <i className="uil uil-check-circle"></i>
      }
      <p>{alert.text}</p>    
    </div>
  )
}

export default AlertModel