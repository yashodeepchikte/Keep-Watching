import {useState, useEffect, useCallback} from "react"
import axios from "axios"

const useFetchSimilarMovies = (movieID) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false) 
 
    
    const fetchData = useCallback(async () => {
        setError(false)
        setLoading(true)
        try {
            const endpoint = "/api/similarMovies/" + movieID
            const result = await axios.get(endpoint)
            console.log("resilt in useFetchFeed = ", result)
            setState({
                ...result
            })

        } catch (error) {
            console.error(error.message)
            setError(true)
        }
        setLoading(false)
    }, [movieID])

    useEffect( () => {
        if(localStorage[movieID+"similar"]){
            setLoading(false)
            console.log("grabbing similar movies for"+ movieID +"from local storage")
            setState(JSON.parse(localStorage[movieID+"similar"]))
            setLoading(false)
        }else{
            console.log("making an api req for getting movies similar to " + movieID)
            fetchData()
        }
    }, [fetchData, movieID])   

    useEffect(
        () => {
            
            localStorage.setItem(movieID+"similar",  JSON.stringify(state))
        },
        [movieID, state]
    )
    return [state, loading, error]
}

export default useFetchSimilarMovies