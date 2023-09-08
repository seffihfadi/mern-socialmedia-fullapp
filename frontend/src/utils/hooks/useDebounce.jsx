import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearInterval(timeoutID)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce