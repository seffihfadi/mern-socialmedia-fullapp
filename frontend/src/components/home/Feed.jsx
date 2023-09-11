import { useState, useEffect } from "react"
import Post from "../posts/Post"
import axios from 'axios'
import Loader from '../Loader'
import Empty from '../Empty'

const Feed = () => {
  const [feed, setFeed] = useState(null)
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/post/', {withCredentials: true})
        setFeed(response.data)
        console.log('response', response)
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [])
  if (!feed) return <Loader msg='updating feed' sm />
  if (feed.length < 1) return <Empty icon="postcard" text="Unlock a world of possibilities - your feed awaits, discover meaningful connections today!" type="lg" />
  return (
    <div className="feed">
      {feed.map((post) => <Post key={post._id} post={post} />)}
      
    </div>
  )
}

export default Feed