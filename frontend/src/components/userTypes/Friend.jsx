import { Link } from "react-router-dom"
const Friend = () => {
  return (
  <div className="flex justify-between w-full">
    <div className="flex flex-col">
        <h3 className="capitalize">ahmed elsayed</h3>
        <span className="text-gray-500">designer</span>
    </div>
    <Link className="ml-auto text-gray-500" to='/chat'>
      <i className="uil uil-comment-lines"></i>
    </Link>
  </div>
  )
}

export default Friend