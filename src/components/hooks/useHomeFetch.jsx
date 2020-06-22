import {useState, useEffect} from "react"
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../config"

const useHomeFetch = () => {
    const [state, setState] = useState( { movies: [] } )
    const [loading, setLoading] = useState( false )
    const [error, setError] = useState( false )
 
    
    const fetchMovies = async (endpoint) => {
        setLoading(true)
        setError(false)

        try{
            const result = await ( await fetch(endpoint) ).json();
            
            setState(prev => {
                return (
                    {
                        ...prev,
                        movies: [...result.results],
                        heroImage: prev.heroImage || result.results[0],
                        currentPage: result.page,
                        totalPages: result.total_pages
                    }
                )
            })
        }catch(error){
            setError(true)
            console.error(error.message)
        }
        setLoading(false)
    }

    useEffect( () => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
    }, [] )

    return [{state, loading, error}, fetchMovies]
}

export default useHomeFetch