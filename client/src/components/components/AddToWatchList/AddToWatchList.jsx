 /* eslint-disable no-unused-vars */
 import React, { useContext, useEffect, useState} from "react"
import axios from "axios"

 
//  import context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  importing styles 
import "./AddToWatchList.style.css"

const AddtoWatchlist = (props)=>{
    const {movieID, movieInfo} = props
    let [loading, setLoading] = useState(false)

    // console.log("Movie iiiid = ", movieID)
    // console.log("MOvie info = ", movieInfo)
    const [operation, setOperation] = useState("addToWatchlist")
    // const movie_id = movie_info.id
    const authContext = useContext(AuthContext)
    const {isAuthenticated, user, loadUser} = authContext
    let matchFound 
    let watchlist 
    useEffect(()=>{

        if (user){
            watchlist  = user.watchlist
            matchFound = user.watchlist.filter(movie => movie.id == movieID)
            if(matchFound.length > 0){
                setOperation("removeFromWatchlist")
            }
        }
    }, [isAuthenticated])
    if(!isAuthenticated){
        return <></>
    }
    // console.log("user == ", user._id)

    const handelClick = async   (event) =>{
        event.preventDefault()
        console.clear()
        setLoading(true)
        console.log("Watchlist == ",user. watchlist)
        const newmovie = {
            id: movieInfo.id,
            poster_path: movieInfo.poster_path,
            original_title: movieInfo.original_title
        }
        watchlist = user.watchlist.filter(movie => movie.id != movieID)
        console.log("operation = ", operation)
        if(operation == "addToWatchlist"){
            watchlist.push(newmovie)
        }

        try {
            const endpoint = "/api/users/updateWatchlist"
            const response = await axios.post(endpoint, {
                userID: user._id,
                watchlist
            })

            console.log("response = ", response)
            if(operation == "addToWatchlist"){
                matchFound = true
                setOperation("removeFromWatchlist")
            }else{
                matchFound = false
                setOperation("addToWatchlist")
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error in adding to watchlistv-->", error.message)
        }


    }
    if(loading){
        return (
            <div className="watchlist-container">
                <button className="loading-watchlist-button" >
                   Loading
                </button> 
         </div>
        )
    }
    if(operation == "removeFromWatchlist"){
        
        return(
            <div className="watchlist-container">
                <button className="remove-watchlist-button" onClick={handelClick}>
                    Remove from watch list
                </button> 
         </div>
        )
    }else{
        return(
           <div className="watchlist-container">
           <button className="add-watchlist-button" onClick={handelClick}>
               Add to watch list
           </button> 
        </div>
       )
    }
 }

 export default AddtoWatchlist


 






