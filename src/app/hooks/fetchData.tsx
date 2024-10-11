import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response) {
          throw new Error("Unable to fetch data");
        }
        const result = await response.json()
        setData(result)
      } catch (e) {
        setError(`Error: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch;