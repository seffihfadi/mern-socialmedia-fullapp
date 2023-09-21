import Feed from "../components/home/Feed"
import Stories from "../components/home/Stories"
import Suggestions from "../components/Suggestions"

const Home = () => {
  return (
    <div className="grid grid-cols-12 p-8 gap-8 home">
      <div className="col-span-12 xl:col-span-9 grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <h1 className="head_text">stories</h1>
          <Stories />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-8">
          <h1 className="head_text">feed</h1>
          <div className="ldr_data">
            <Feed />
          </div>
        </div>
        <div className="hidden md:block md:col-span-3 lg:col-span-4">
          <div className="sticky top-4">
            <h1 className="head_text">suggestions</h1>
            <Suggestions />
          </div>
        </div>
      </div>
      <div className="hidden xl:block xl:col-span-3">
        <h1 className="head_text">Settings</h1>
      </div>
    </div>
  )
}

export default Home