import Comments from "./Comments"
import TimeAgo from 'react-timeago'
import User from "../userTypes/User"
import WriteComment from "./WriteComment"
import LikePost from "../Buttons/LikePost"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import { usePost, useWriteTo } from "../../context/PostProvider"

const Post = () => {
  const [post, setPost] = usePost()
  const {_id: sessionID} = useAuth()
  const [writeTo, setWriteTo] = useWriteTo()
  const [viewComments, setViewComments] = useState(false)

  const handleComment = () => {
    setWriteTo({
      commentID: '', 
      postID: post._id, 
      owner: post.owner
    })
    // setPost(prev => ({ ...prev, comments: prev.comments + 1 }))
  }

  return (
    <div id={`post-${post._id}`} className="post">
      
      <div className="flex justify-between">
        <User 
          user={post.owner} 
          span={
            <>
              <TimeAgo date={post.createdAt} />{' '}
              {new Date(post.createdAt) != new Date(post.updatedAt) && <span>(updated)</span>}
              <span className="privacy-span">{post.privacy}</span>
            </>
          } 
        />
        {post.owner._id === sessionID 
        ?
          <Link to={`/post/${post._id}/update`}>
            <i className="uil uil-pen"></i>
          </Link>
        :
          <button>
            <i className="uil uil-ellipsis-v"></i>
          </button>
        }
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
          <LikePost />
          <button onClick={handleComment}>
            <i className="uil uil-comment-lines"></i>
          </button>
        </div>
        <button>
          <i className="uil uil-share"></i>
        </button>
      </div>

      <div className="flex gap-2 px-3">
        <span>{post.reactions.length} likes</span>
        {post.views > 0 && 
          <>
            &bull;
            <span>{post.views} views</span>
          </>
        }
        {post.comments > 0 && 
          <>
            &bull;
            <button 
              onClick={() => setViewComments(!viewComments)}
            >
              {post.comments} comments
            </button>
          </>
        }
      </div>

      {viewComments && <Comments />} 
      <WriteComment {...writeTo}  />
    </div>
  )
}

export default Post