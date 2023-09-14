import Connection from '../../components/profile/Connection'
import { useState, useEffect } from 'react'
import useDebounce from '../../utils/hooks/useDebounce'
import axios from 'axios'
import { useAlert } from '../../context/AlertProvider'
import Empty from '../Empty'

const Search = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const debouncedSearch = useDebounce(search, 500)
  const [setAlert] = useAlert()

  useEffect(() => {
    /* search.length > 0 &&*/ (async function () {
      try {
        const responce = await axios.get(`http://127.0.0.1:4000/api/user/getusers?search=${debouncedSearch}`,
          {withCredentials: true}
        )
        //console.log('responce', responce)
        if (responce.status === 200) {
          setData(responce.data)
        }
        
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
          name='search' 
          value={search}
          onChange={(e) => {setSearch(e.target.value)}} 
          className='glass w-full' 
          placeholder='Search' 
          type="text" 
        />
        {!!search &&
          <button onClick={() => {setSearch('')}} className='absolute right-2 top-[0.25rem]'>
            <i className="uil uil-times"></i>
          </button>
        }
      </div>
      {data.length > 0 ?
      <div className="connections overflow-y-auto">
        {data.map((user) => <Connection user={user} key={user._id} type='notfriend' />)}
      </div>
      :
      <Empty type='lg' text='Discover new, fascinating individuals and forge meaningful connections with them.' />
      }
      
    </div>
  )
}

export default Search