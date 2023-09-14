import { useEffect, useState } from 'react';

const Loader = ({ msg, sm=false }) => {
  const [timeOut, setTimeOut] = useState(false);
  //const navigate = useNavigate();
  //const [setAlert] = useAlert()
    // const time = setTimeout(() => {
    //   setTimeOut(true)
    // }, 2e4);
  
    // if (timeOut) {
    //   clearTimeout(time)
    //   alert('time out, check your connection')
    // }

 // if (timeOut) setAlert({type: 'error', text: 'time out, check your connection'})
  return (
    <>
      {!timeOut && (
        <div className={`loading ${sm && 'sm'}`}>
          <div className="circul_loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx={50}
                cy={50}
                r={sm?12:20}
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