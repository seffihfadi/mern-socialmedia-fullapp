import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import useDebounce from "../../utils/hooks/useDebounce"
import axios from "axios"

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")
  const [search, setSearch] = useState(searchQuery || '')
  const [tags, setTags] = useState([])
  const debouncedSearch = useDebounce(search, 500)
  
  useEffect(() => {
    const searchDoc = !search ? {} : {"search": debouncedSearch}
    setSearchParams(searchDoc)
  }, [debouncedSearch])

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/post/tags`, {withCredentials: true})
        setTags(response.data)
        console.log('response tages', response)
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [])

  return (
    <div className="search col-span-12 my-10 lg:my-0 lg:col-span-7">
      <input 
        name='search'
        value={search}
        onChange={(e) => {setSearch(e.target.value)}} 
        className='glass' 
        placeholder='Search' 
        type="text" 
      />
      <div className="tags">
        <div onClick={(e) => {setSearch('')}} className="tag">#All</div>
        {tags?.map((tag, i) => <div key={i} onClick={(e) => {setSearch(tag)}} className="tag">#{tag}</div>)}
      </div>
    </div>
  )
}

export default Search