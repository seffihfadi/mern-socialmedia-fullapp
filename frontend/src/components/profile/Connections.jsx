import Connection from "./Connection"
import Empty from "../Empty"
import { useAuth } from "../../context/AuthProvider"

const Connections = ({ user }) => {
  const connections = user.connections
  const {_id: sessionID} = useAuth()
  //console.log('connections', connections)
  if (connections.length < 1 && sessionID === user._id) return <Empty icon="user-plus" type="sm" text="try to find connections" />
  if (connections.length < 1 && sessionID !== user._id) return <Empty icon="user-plus" type="sm" text={`${user.fullname} don't have any connection yet`} />
  return (
    <div className="connections overflow-y-auto">
      {connections.map((connection) => <Connection key={connection.id} user={connection} type='notfriend' />)}
    </div>
  )
}

export default Connections