import {useState, useEffect, useCallback} from "react"
import { API_URL, API_KEY } from "../../config"

const useMovieFetch = (movieId) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false)
        setLoading(true)

        try {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
            const result = await ( await fetch(endpoint) ).json()
            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
            const creditsResult = await ( await fetch(creditsEndpoint) ).json()
            


            const directors =  creditsResult.crew.filter( member => member.job === "Director")
            setState({
                ...result,
                actors: creditsResult.cast,
                directors
            })
        } catch (error) {
            setError(true);
            console.error(error.message)
        }
        setLoading(false)
    }, [movieId])

    useEffect( () =>{
        fetchData();
    }, [fetchData])
    return [state, loading, error]
}

export default useMovieFetch