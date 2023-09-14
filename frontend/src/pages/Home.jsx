import Feed from "../components/home/Feed"
const Home = () => {
  return (
    <div className="grid grid-cols-12 p-8 gap-8">
      <div className="col-span-12 xl:col-span-9 grid grid-cols-12 gap-8">
        <div className="col-span-12">
          story
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-8">
          <h1 className="head_text">feed</h1>
          <div className="relative">
            <Feed />
          </div>
        </div>
        <div className="hidden md:block md:col-span-3 lg:col-span-4">
          <h1 className="head_text">suggestions</h1>
        </div>
      </div>
      <div className="hidden xl:block xl:col-span-3">side</div>
    </div>
  )
}

export default Home