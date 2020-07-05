/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"
import "./reviews.styles.css"
import axios from "axios"
import {Link } from "react-router-dom"

import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

const Reviews =   (props) => {
    
    const movieID = props.movieID
    
    const authContext = useContext(AuthContext) 
    const {loading, setLoadingtrue, isAuthenticated, user, setLoadingFalse, loadUser} = authContext
    
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext
    
    const [stateReview, setStateReview] = useState("")
    const [isReviewed, setIsReviewed] = useState(false)
    let movieReviewed = false
    useEffect( () => {
        const fetchReview = async () => {
            if(isAuthenticated){let reviewID = -1
                for(let i =0; i<user.movies_reviewed.length; i++){
                    if (user.movies_reviewed[i][0] === String(movieID)){
                        setIsReviewed(true)
                        reviewID = user.movies_reviewed[i][1] 
                        break
                    }
                }
                let review = await axios.get("/api/reviews/review/"+reviewID)
                review = review.data.review 
                console.log("<<<<<<<<<<setting state of the review in useeffect()>>>>>>>>>>> ") 
                setStateReview(review)}
        }
        fetchReview()
    }, [isAuthenticated, user])

    if (!isAuthenticated){
        return(<div className="review"><Link to = "/signin"> Log in to leave a review for this movie</Link></div>)
    }
    else{
        console.log("movie reviewed = ", movieReviewed)
        if(isReviewed){        
            return(
                <div className="review">
                    <h1>
                        Your Review : {stateReview}
                    </h1>
                </div>
            )
        }else{
            const handelChange = (event) => {
                console.log(event.target.name ,  " ----> ", event.target.value )
                setStateReview(event.target.value)
            }
            const handelSubmit = async (event) => {
                event.preventDefault()
                

                const data = {
                    user_id : event.target.user_id.value,
                    movie_id : event.target.movie_id.value,
                    review : event.target.review_text.value,
                    username : event.target.username.value,
                }
                console.log("Data recieved = ", data)
                if(stateReview.length < 1){
                    console.log("submit cancelled because review.length < 1")
                    setAlert("please fill in a rreview to submit")
                    return
                }
    
                try {
                    console.log("making the post request")
                    const res = await axios.post("/api/reviews/addReview", data)
                    console.log("the response of the post req = ", res.data)
                    console.log("calling load user")
                    loadUser()
                } catch (error) {
                    console.log("Error in the catch block inn the onSubmit function in the reviews.jsx")
                    console.log("error = ",  error.message)
                }
            }
            return(
                <div className="review">
                    <form onSubmit={handelSubmit}>
                            <input type="hidden" value={user._id} name="user_id"/>
                            <input type="hidden"  value={movieID} name="movie_id" />
                            <input type="hidden"  value={user.username} name="username"/>
                            <input type="text" value = {stateReview} name="review_text" onChange={handelChange}/>
                            <button type="submit" className="button">Post Review</button>
                    </form>
                </div>
            )
        }
    }
}

export default Reviews