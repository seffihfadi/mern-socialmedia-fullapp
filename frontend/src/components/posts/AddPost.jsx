import React from 'react'
import PostForm from './PostForm'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from '../../context/AlertProvider'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
  const [postForm, setPostForm] = useState(null)
  const [setAlert] = useAlert()
  const navigate = useNavigate()
  
  useEffect(() => {
    (async function () {
      if (!postForm) return
      try {
        const response = await axios.post('http://127.0.0.1:4000/api/post/create', postForm, {withCredentials: true})
        //console.log('response', response)
        setAlert({type: 'success', text: response.data.message})
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      } finally {
        setPostForm(null)
        navigate('/', {replace: true})
      }
    })()
  }, [postForm])

  return (
    <div className="formarea">
      <h1 className="head_text text-xl">Create Your Post</h1>
      <PostForm type='Create' postForm={postForm} setPostForm={setPostForm} />
    </div>
  )
}

export default AddPost