import {useEffect, useState, useRef} from 'react'
import PostForm from './PostForm'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'

import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../context/AlertProvider'

const UpdatePost = () => {
  const [postForm, setPostForm] = useState(null)
  const {postID} = useParams()
  const navigate = useNavigate()
  const [setAlert] = useAlert()

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/post/${postID}`, {withCredentials: true})
        //console.log('response', response)
        setPostForm(response.data)
        
      } catch (error) {
        //setAlert({type: 'error', text: error.response.data.message})
        console.log('error', error)
        navigate('/', {replace: true})
      }
    })()
  }, [])

  const firstUpdate = useRef(true)
  useEffect(() => {
    (async function () {
      if (!postForm) return
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      try {
        const response = await axios.patch(`http://127.0.0.1:4000/api/post/${postID}/update`, 
          postForm, {withCredentials: true}
        )
        setAlert({type: 'success', text: response.data.message})
        navigate('/', {replace: true})
      } catch (error) {
        navigate('/', {replace: true})
      }
    })()
  }, [postForm])

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/api/post/${postID}`, 
       {withCredentials: true}
      )
      setAlert({type: 'success', text: response.data.message})
      navigate('/', {replace: true})
    } catch (error) {
      navigate('/', {replace: true})
    }
  }

  return (
    <div className="formarea">
      <h1 className="head_text text-xl">Update Your Post</h1>
      <div>
        {postForm 
        ? <PostForm type='Update' postForm={postForm} setPostForm={setPostForm} />
        : <Loader sm={true} msg='loading' />
        }
      </div>


      <h1 className="head_text text-xl">Delete The Post</h1>
      <p>This action will result in the removal of all comments, reactions, and views associated with the post.</p>
      <div className="mt-4">
        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </div>
    </div>
  )
}

export default UpdatePost