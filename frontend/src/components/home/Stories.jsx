
const Stories = () => {
  return (
    <div className="stories">
      <div className="story">
        <div className="story_user">
          <img src="/bg.jpg" alt="ss" />
        </div>
        <div className="story_banner">
          <img src="/bg10.jpg" alt="ss" />
        </div>
        <div className="flex justify-between absolute bottom-0 w-full py-2 px-3">
          <h3 className="capitalize">seffih fadi</h3>  
          <span>3d</span>
        </div>
      </div>
      <div className="story">
        <div className="story_user">
          <img src="/bg3.jpg" alt="ss" />
        </div>
        <div className="story_banner">
          <img src="/bg9.jpg" alt="ss" />
        </div>
        <div className="flex justify-between absolute bottom-0 w-full py-2 px-3">
          <h3 className="capitalize">ahmed mohamed</h3>  
          <span>3d</span>
        </div>
      </div>
      <div className="story">
        <div className="story_user">
          <img src="/bg4.jpg" alt="ss" />
        </div>
        <div className="story_banner">
          <img src="/bg2.jpg" alt="ss" />
        </div>
        <div className="flex justify-between absolute bottom-0 w-full py-2 px-3">
          <h3 className="capitalize">kingaro rami</h3>  
          <span>3d</span>
        </div>
      </div>
    </div>
  )
}

export default Stories