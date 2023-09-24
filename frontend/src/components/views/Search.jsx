import axios from 'axios'
import Empty from '../Empty'
import NotFriend from '../userTypes/NotFriend'
import useDebounce from '../../utils/hooks/useDebounce'

import { useState, useEffect, useRef } from 'react'
import { useAlert } from '../../context/AlertProvider'

const Search = () => {
  const inputRef = useRef()
  const [setAlert] = useAlert()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    (async function () {
      inputRef.current.focus()
      try {
        const responce = await axios.get(`http://127.0.0.1:4000/api/user/getusers?search=${debouncedSearch}`,
          {withCredentials: true}
        )
        setData(responce.data)
      } catch (error) {
        setAlert({type: 'error', text: error.response.data.message})
      }
    })()
  }, [debouncedSearch])

  return (
    <div className="search">
      <h1 className="head_text text-xl">Search</h1>
      <div className="mb-5 relative">
        <input 
          type="text" 
          name='search' 
          ref={inputRef}
          value={search}
          placeholder='Search' 
          className='glass w-full' 
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearch(e.target.value)} 
        />
        {!!search &&
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setSearch('')
            }} 
            className='absolute right-2 top-[0.25rem]'
          >
            <i className="uil uil-times"></i>
          </button>
        }
      </div>
      {data.length > 0 
      ?
        <div className="connections overflow-y-auto">
          {data.map((user) => <NotFriend user={user} key={user._id} />)}
        </div>
      :
        <Empty type='lg' text='Discover new, fascinating individuals and forge meaningful connections with them.' />
      }
      
    </div>
  )
}

export default Search