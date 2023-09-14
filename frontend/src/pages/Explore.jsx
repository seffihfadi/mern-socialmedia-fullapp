import Pins from '../components/explore/Pins'
import Search from '../components/explore/Search'

const Explore = () => {
  return (
    <div className="explore">
      <div className="pt-1 gap-4 grid grid-cols-12">
        <div className="max-w-md py-4 col-span-12 lg:col-span-5">
          <h1 className="head_text text-4xl">Explore</h1>
          <p className="text-lg">Embark on a captivating journey to explore posts and connect with people.</p>
        </div>
        <Search />
      </div>
      <div className="container">
        <Pins />
      </div>
      
    </div>
  )
}

export default Explore