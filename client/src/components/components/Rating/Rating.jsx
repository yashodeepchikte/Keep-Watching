/* eslint-disable no-unused-vars */
import React, {useState, useContext } from "react"
import { Link}  from "react-router-dom"
import axios from "axios"


//  import context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  Import styles
import "./Rating.Styles.css"



const Ratings =  (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, user, loadUser} = authContext

    const [loading, setLoading] = useState(false);
     // eslint-disable-next-line
    // const [rating, setRating] = useState(-1)

    if(!isAuthenticated){
        return(
            <div>
                {/* <Link to="/signin" className="button">Rate this movie</Link> */}
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
        setLoading(true)
        console.log("Rating = ", event.target.rating.value)
        console.log("user id = ", userID)
        console.log("movie id = ", movieID)
        userRatings.push( [movieID, Number(event.target.rating.value)] )
        console.log("userRatings = ", userRatings)
        const updatedUser = await axios.post("/api/users/update", {userID, updateField:"ratings" , updatedValues:userRatings})
        console.log("updated user = ",  updatedUser )
        loadUser()
        setLoading(false)
    }

    if(loading){
        return(
            <div className="ratings">

                Loaging
            </div>
        )
    }

    if (movieRating === -1){
        //  The user has not yet rated the movie
        return(
            <div className="ratings">
               <p>Rate this Movie</p>
                    <form onSubmit={rateMovie}>         
                        <select name="rating" id="ratings">
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Star</option>
                            <option value={3}>3 Star</option>
                            <option value={4}>4 Star</option>
                            <option value={5}>5 Star</option>
                        </select>
                        <button type="submit" className="button">Rate</button>
                    </form>
            </div>
        )
    }else{
        //  user wants to change the rating
        return(
            <div className="ratings">
                <p>Your Rating : {movieRating + " "}<i className="fa fa-star" aria-hidden="true"></i></p>
            </div>
        )
    }
}

export default Ratings