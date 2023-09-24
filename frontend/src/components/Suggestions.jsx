import axios from "axios"
import { useState, useEffect } from "react"
import NotFriend from "./userTypes/NotFriend"



const Suggestions = () => {
  const [seggestions, setSeggestions] = useState(null)

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/user/getsegg`,
          {withCredentials: true}
        )
        setSeggestions(response.data)
      } catch (error) {
        setAlert({type: 'error', text: 'can not get seggestions'})
      }
    })()
  }, [])


  return (
    <div className="connections overflow-y-auto">
      {seggestions && seggestions.map((connection, i) => 
        <NotFriend key={i} user={connection} />
      )}
    </div>
  )
}

export default Suggestions