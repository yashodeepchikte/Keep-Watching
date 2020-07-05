import {useState, useEffect, useCallback} from "react"
import axios from "axios"

const useFetchFeed = (movieID) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false) 

    const fetchData = useCallback(async () => {
        setError(false)
        setLoading(true)

        try {
            const endpoint = "/api/reviews/feed"
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
        if(localStorage["feed"]){
            setLoading(false)
            console.log("grabbing Feed from local storage")
            setState(JSON.parse(localStorage["feed"]))
            setLoading(false)
        }else{
            console.log("making an api req for getting the feed")
            fetchData()
        }
    }, [fetchData, movieID])

    useEffect(
        () => {
            localStorage.setItem("feed",  JSON.stringify(state))
        },
        [movieID, state]
    )
    return [state, loading, error]
}

export default useFetchFeed