import axios from "axios"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import useDebounce from "../../utils/hooks/useDebounce"

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
        const response = await axios.get(`http://127.0.0.1:4000/api/post/tags?search=${debouncedSearch}`, {withCredentials: true})
        setTags(response.data)
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [debouncedSearch])

  return (
    <div className="search col-span-12 my-10 lg:my-0 lg:col-span-7">
      <input 
        type="text" 
        name='search'
        value={search}
        className='glass' 
        placeholder='Search' 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div className="tags">
        <div onClick={() => setSearch('')} className="tag">#All</div>
        {tags.length > 0 && tags.map((tag, i) => 
          <div 
            key={i} 
            onClick={() => setSearch(tag)} 
            className="tag"
          >
            #{tag}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search