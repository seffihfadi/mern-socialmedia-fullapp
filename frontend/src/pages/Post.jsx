import { Outlet } from "react-router-dom"

const Post = () => {
  return (
    <div className="postconfig">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 xl:col-span-7">
          <h1 className="head_text text-3xl">"Join the conversation - Share Your Post!"</h1>
          <p className="text-lg">Explore fresh and intriguing encounters while forming valuable connections with others by sharing your own story.</p>
          <div className="grid grid-cols-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post