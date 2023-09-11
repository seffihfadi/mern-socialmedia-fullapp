import User from "../userTypes/User"
import TimeAgo from 'react-timeago'

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="flex justify-between">
        <User user={post.owner} span={<TimeAgo date={post.createdAt} />} />
        <button>
          <i className="uil uil-ellipsis-v"></i>
        </button>
      </div>
      {!!post.desc && <p className="px-3">{post.desc}</p>}
      <div className={`imgscol num-${post.images.length}`}>
        {post.images.map((imgUrl, i) =>
          <div key={i} className="imgcol">
            <img loading="lazy" src={imgUrl} alt={imgUrl} />
          </div>
        )}
      </div>
      <div className="flex justify-between px-3">
        <div className="flex gap-5">
          <button>
            <i className="uil uil-heart-alt"></i>
          </button>
          <button>
            <i className="uil uil-comment-lines"></i>
          </button>
        </div>
        <button>
          <i className="uil uil-share"></i>
        </button>
      </div>
      <div className="flex gap-2 px-3">
        <span>{post.reactions.length} likes</span>
        &bull;
        <span>{post.views} views</span>
        &bull;
        <span>{post.comments.length} comments</span>
      </div>
    </div>
  )
}

export default Post