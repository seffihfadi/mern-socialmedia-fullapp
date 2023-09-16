import { useState, useEffect } from "react"
import Post from "../posts/Post"
import axios from 'axios'
import Loader from '../Loader'
import Empty from '../Empty'
import PostProvider from "../../context/PostProvider"
import { useSearchParams } from "react-router-dom"

const Feed = ({ userID = '', setPostsCount }) => {
  const [feed, setFeed] = useState(null)
  const [searchParams] = useSearchParams()
  const postID = searchParams.get("post")
  const isProfile = !!userID

  const emptyText = isProfile ? "Unfortunately, there is no posts at the moment. there's always more to discover and connect over!" : 'Unlock a world of possibilities - your feed awaits, discover meaningful connections today!'

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/post${isProfile ? `/${userID}/posts` : ''}`, {withCredentials: true})
        setFeed(response.data)
        isProfile && setPostsCount(response.data.length)
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [userID])

  useEffect(() => {
    if (!postID) return
    (function () {
      const postElement = document.getElementById(`post-${postID}`)
      if (postElement) {
        postElement.scrollIntoView({
          behavior: 'smooth',
        })
      }
    })()
  }, [feed])
  
  if (!feed) return <Loader msg='updating feed' sm />
  if (feed.length < 1) return <Empty icon="postcard" text={emptyText} type="lg" />
  return (
    <div className="feed">
      {feed.map((post) => <PostProvider key={post._id} post={post}><Post /></PostProvider>)}
    </div>
  )
}

export default Feed