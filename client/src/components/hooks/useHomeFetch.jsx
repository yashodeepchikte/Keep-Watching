import {useState, useEffect} from "react"
import  {
    POPULAR_BASE_URL 
}
from "../../config"

const useHomeFetch = (searchTerm) => {
    const [state, setState] = useState( { movies: [] } )
    const [loading, setLoading] = useState( false )
    const [error, setError] = useState( false )
 
    
    const fetchMovies = async (endpoint) => {
        setLoading(true)
        setError(false)
        
        const isLoadMore = endpoint.search("page")  // is page is present in the end point means we r loading more movies
        try{
            const result = await ( await fetch(endpoint) ).json();
            // console.log("result == ", result)
            setState(prev => (
                    {
                        ...prev,
                        movies: 
                        ( isLoadMore !== -1 ?
                         [...prev.movies, ...result.results]
                         :
                         [...result.results]),
                        heroImage: prev.heroImage || result.results[0],
                        currentPage: result.page,
                        totalPages: result.total_pages
                    }))
            }catch(error){
                setError(true)
                console.error(error.message)
            }
            setLoading(false)
        }
        
        useEffect(  () => {
            if (sessionStorage.homeState){
                // console.log("Loading data from session storage")
                setState(JSON.parse(sessionStorage.homeState));
                setLoading(false)
            }else{

                console.log("Fetching from the movie db api")
                fetchMovies(POPULAR_BASE_URL)
            }
             }, [] )
        
        useEffect( () => {
            if(!searchTerm){
                // console.log("Writing to session storage")
                sessionStorage.setItem('homeState', JSON.stringify(state))
            }
        }, [searchTerm, state])
    return [{state, loading, error}, fetchMovies]
}

export default useHomeFetch