import Connection from "../profile/Connection"
import { useAuth } from "../../context/AuthProvider"

const Conversation = () => {
  const user = useAuth()
  return (
    <div className="center">
      <div className="flex justify-between py-2 px-4">
        <Connection type='user' />
        <div className="flex">
          <button><i className="uil uil-sliders-v"></i></button>
        </div>
      </div>
      <div className="msgs h-full overflow-y-auto px-6">
        <div className="msg">
          <div className="in sendin text-center">
            <span>Thu oct 5, 2023</span>
          </div>
          <div className="flex gap-2">
            <div className="flex">
              <img className="w-8 h-8 object-cover mt-auto rounded-full" src="/bg4.jpg" alt="" />
            </div>
            <div className="text">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit cumque numquam, nemo animi eligendi ut aliquam ex iusto, qui dolores id error voluptatum sapiente eos. Distinctio magni placeat fugiat doloribus.</p>
            </div>
          </div>
          <div className="in seenin">
            <span>seen 15:30</span>
          </div>
        </div>
        <div className="msg me">
          <div className="in sendin text-center">
            <span>Thu oct 5, 2023</span>
          </div>
          <div className="flex flex-row-reverse gap-2">
            <div className="text">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit cumque numquam, nemo animi eligendi ut aliquam ex iusto, qui dolores id error voluptatum sapiente eos. Distinctio magni placeat fugiat doloribus.</p>
            </div>
          </div>
          <div className="in seenin">
            <span>seen 15:30</span>
          </div>
        </div>
        <div className="msg me">
          <div className="in sendin text-center">
            <span>Thu oct 5, 2023</span>
          </div>
          <div className="flex flex-row-reverse gap-2">
            <div className="text img">
              <img src="/bg4.jpg" alt="" />
            </div>
          </div>
          <div className="in seenin">
            <span>seen 15:30</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-auto items-center py-2 px-4">
        <div className="flex">
          <button><i className="uil uil-image"></i></button>  
        </div>
        <div className="relative w-full">
          <input name="message" className="glass" type="text" placeholder="Aa" />
          <img className="left-1 top-1 absolute w-8 h-8 rounded-full object-cover" src={user.image} alt={user.name} />
        </div>
        <div className="flex">
          <button><i className="uil uil-message"></i></button>  
        </div>
      </div>
    </div>
  )
}

export default Conversation