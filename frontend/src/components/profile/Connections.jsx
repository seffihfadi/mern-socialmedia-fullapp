import Connection from "./Connection"
import Empty from "../Empty"
import { useAuth } from "../../context/AuthProvider"
import NotFriend from "../userTypes/NotFriend"

const Connections = ({ user }) => {
  const connections = user.connections
  const {_id: sessionID} = useAuth()
  //console.log('connections', connections)
  if (connections.length < 1) {
    return (
      <Empty 
        icon="user-plus" 
        type="sm" 
        text={sessionID === user._id 
          ? "try to find connections" 
          : `${user.fullname} don't have any connection yet`
        } 
      />
    )
  } 
  return (
    <div className="connections overflow-y-auto">
      {connections.map((connection, i) => 
        <NotFriend key={i} user={{...connection, relationTome: 'connection'}} />
      )}
    </div>
  )
}

export default Connections