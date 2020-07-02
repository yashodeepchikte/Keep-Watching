import React, {useState, useContext } from "react"
import {Redirect, Link}  from "react-router-dom"

//  import context
import AuthContext from "../../../context/Authentication/authenticationContext"
import UserContext from "../../../context/Users/userContext"
//  Import styles
import "./Rating.Styles.css"


const Ratings =  (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, user} = authContext
    const userContext = useContext(UserContext)
    const {loadUser, unloadUser, updateUser, currentUser} = userContext
    const [rating, setRating] = useState(-1)
    if(!isAuthenticated){
        return(
            <div  className="ratings">
                <Link to="/signin">Rate this movie</Link>
            </div>
        )
    }
    
    const movieID = props.movie;
    const userRatings = user.ratings;
    
    let movieRating  = -1
    for(let i = 0; i<userRatings.length; i++){
        if (userRatings[i][0] === movieID ){
            movieRating = userRatings[i][1]
        }
    }

    const handelChange = e => {
        setRating(e.target.rating.value)
    }
    const handelSubmit = e => {
        e.preventDefault();

    }
    return(
        <div className="ratings">
            <form onSubmit={handelSubmit}><input type="text" name="rating" value = {rating} onChange={handelChange}/></form>
        </div>
    )
}

export default Ratings