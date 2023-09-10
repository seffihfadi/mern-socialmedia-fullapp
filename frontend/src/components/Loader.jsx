import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertProvider';

const Loader = ({ msg }) => {
  const [timeOut, setTimeOut] = useState(false);
  //const navigate = useNavigate();
  const [setAlert] = useAlert()

  const time = setTimeout(() => {
    setTimeOut(true)
  }, 30000);

  if (timeOut) {
    clearTimeout(time)
    setAlert({type: 'error', text: 'time out, check your connection'})
  }

  return (
    <>
      {!timeOut && (
        <div className="loading">
          <div className="circul_loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx={50}
                cy={50}
                r={20}
                fill="none"
                strokeWidth={2}
                strokeMiterlimit={10}
              />
            </svg>
          </div>
          { msg && <p>{ msg }</p> }
        </div>
      )}
    </>
  )
}
export default Loader