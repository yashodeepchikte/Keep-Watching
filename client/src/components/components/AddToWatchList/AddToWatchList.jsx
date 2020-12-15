/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"


//  import context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  importing styles 
import "./AddToWatchList.style.css"

const AddtoWatchlist = (props) => {
    const { movieID, movieInfo, tick } = props
    let [loading, setLoading] = useState(false)

    // console.log("Movie iiiid = ", movieID)
    // console.log("MOvie info = ", movieInfo)
    const [operation, setOperation] = useState("addToWatchlist")
    // const movie_id = movie_info.id
    const authContext = useContext(AuthContext)
    const { isAuthenticated, user, loadUser } = authContext
    let matchFound
    let watchlist
    useEffect(() => {

        if (user) {
            watchlist = user.watchlist
            matchFound = user.watchlist.filter(movie => movie.id == movieID)
            if (matchFound.length > 0) {
                setOperation("removeFromWatchlist")
            }
        }
    }, [isAuthenticated])
    if (!isAuthenticated) {
        return <></>
    }
    // console.log("user == ", user._id)

    const handelClick = async (event) => {
        event.preventDefault()
        // console.clear()
        setLoading(true)
        console.log("Watchlist == ", user.watchlist)
        const newmovie = {
            id: movieInfo.id,
            poster_path: movieInfo.poster_path,
            original_title: movieInfo.original_title
        }
        watchlist = user.watchlist.filter(movie => movie.id != movieID)
        console.log("operation = ", operation)
        if (operation == "addToWatchlist") {
            watchlist.unshift(newmovie)
        } else {
            watchlist = watchlist.filter(film => film.id != movieInfo.id)
            console.log("new watchlist = ", watchlist)
        }

        try {
            const endpoint = "/api/users/updateWatchlist"
            const response = await axios.post(endpoint, {
                userID: user._id,
                watchlist
            })

            console.log("response = ", response)
            matchFound = user.watchlist.filter(movie => movie.id == movieID)
            if (operation == "addToWatchlist") {
                matchFound = true
                setOperation("removeFromWatchlist")
            } else {
                matchFound = false
                if (!tick) {

                    setOperation("addToWatchlist")
                }
            }
            setLoading(false)
            loadUser()
        } catch (error) {
            setLoading(false)
            console.log("Error in adding to watchlistv-->", error.message)
            loadUser()
        }


    }
    if (loading) {
        return (
            <div className={`watchlist-container ${tick && "tick"}`}>
                <button className={`loading-watchlist-button ${tick && "tick"}`} >
                    {tick ? ":" : "Loading"}
                </button>
            </div>

        )
    }
    if (operation == "removeFromWatchlist") {

        return (
            <div className={`watchlist-container ${tick && "tick"}`}>
                <button className={`remove-watchlist-button ${tick && "tick"}`} onClick={handelClick}>
                    {tick ? " - " : "Remove from watch list"}
                </button>
            </div>
        )
    } else {
        return (
            <div className={`watchlist-container ${tick && "tick"}`}>
                <button className={`add-watchlist-button ${tick && "tick"}`} onClick={handelClick}>
                    {tick ? " + " : "Add to watch list"}
                </button>
            </div>
        )
    }
}

export default AddtoWatchlist









