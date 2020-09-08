
import {useState, useEffect, useCallback} from "react"
import axios from "axios"

const useReviewsFetch = (movieID) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false) 

    const fetchData = useCallback(async () => {
        setError(false)
        setLoading(true)

        try {
            console.log("movie id in usefetch = ", movieID)
            const endpoint = "/api/reviews/movie/" + movieID
            const result = await axios.get(endpoint)
            console.log("result ins useFetch = ", result)

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
        // if(sessionStorage[movieID + "review"] != {}){
        //     setLoading(false)
        //     console.log("grabbing review for "+movieID+" from session storage")
        //     setState(JSON.parse(sessionStorage[movieID+"review"]))
        //     setLoading(false)
        // }else{
            console.log("making an api req for getting the reviews")
            fetchData()
        // }
    }, [fetchData, movieID])

    useEffect(
        () => {
            sessionStorage.setItem(movieID+"review", JSON.stringify(state))
        },
        [movieID, state]
    )
        return [state, loading, error]
}

export default useReviewsFetch