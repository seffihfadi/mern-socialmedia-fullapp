import { Link } from "react-router-dom"
const EditPass = () => {
  return (
    <form noValidate>
      <div className="group glass">
        <input id="oldpass" name="oldpass" type="password" required />
        <label htmlFor="oldpass">old password</label>
      </div>
      <div className="group glass">
        <input id="newpass" name="newpass" type="password" required />
        <label htmlFor="newpass">new password</label>
      </div>
      <div className="flex justify-between items-center">
        <Link to='/profile'>Cancel</Link>
        <button className="gradient">Change</button>
      </div>
    </form>
  )
}

export default EditPass