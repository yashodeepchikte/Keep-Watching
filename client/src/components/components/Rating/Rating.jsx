import React, {useState, useContext } from "react"
import {Redirect, Link}  from "react-router-dom"
import axios from "axios"

//  import context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  Import styles
import "./Rating.Styles.css"
import Axios from "axios"


const Ratings =  (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, user, loadUser} = authContext

    const [rating, setRating] = useState(-1)
    if(!isAuthenticated){
        return(
            <div  className="ratings">
                <Link to="/signin">Rate this movie</Link>
            </div>
        )
    }
    
    const movieID = props.movieID;
    const userRatings = user.ratings;
    const userID = user._id;

    let movieRating  = -1
    for(let i = 0; i<userRatings.length; i++){
        if (userRatings[i][0] === movieID ){
            movieRating = userRatings[i][1]
        }
    }

    const rateMovie = async (event) => {
        event.preventDefault()
        console.log("Rating = ", event.target.rating.value)
        console.log("user id = ", userID)
        console.log("movie id = ", movieID)
        userRatings.push( [movieID, Number(event.target.rating.value)] )
        console.log("userRatings = ", userRatings)
        const updatedUser = await axios.post("/api/users/update", {userID, updateField:"ratings" , updatedValues:userRatings})
        console.log("updated user = ",  updatedUser )
        loadUser()
    }

    if (movieRating === -1){
        //  The user has not yet rated the movie
        return(
            <form onSubmit={rateMovie}>
                <select name="rating" id="cars">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button type="submit">Rate</button>
            </form>
        )
    }else{
        //  user wants to change the rating

        // return(<h1>Rate movie</h1>)

        return(<h1>Your Rating : {movieRating}</h1>)

    }
}

export default Ratings