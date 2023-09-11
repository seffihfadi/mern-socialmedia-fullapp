import Feed from "../components/home/Feed"
const Home = () => {
  return (
    <div className="grid grid-cols-12 p-8 gap-8">
      <div className="col-span-9 grid grid-cols-12 gap-8">
        <div className="col-span-12">
          story
        </div>
        <div className="col-span-8 relative">
          <Feed />
        </div>
        <div className="col-span-4">sujestion</div>
      </div>
      <div className="col-span-3">side</div>
    </div>
  )
}

export default Home