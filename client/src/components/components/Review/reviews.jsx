/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"
import "./reviews.styles.css"
import axios from "axios"
import {Link } from "react-router-dom"

import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

const Reviews =   (props) => {
    
    const movieID = props.movieID
    const movie_data = props.movie
    
    const authContext = useContext(AuthContext) 
    const {loading, setLoadingtrue, isAuthenticated, user, setLoadingFalse, loadUser} = authContext
    
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext
    
    const [stateReview, setStateReview] = useState("")
    const [isReviewed, setIsReviewed] = useState(false)
    const [readMore, setReadMore] = useState(false)


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
                setStateReview(review)}
        }
        fetchReview()
    }, [isAuthenticated, user, readMore])

    if (!isAuthenticated){
        return(<div className="review-container"><div  className="SigninLink-container"><Link to = "/signin" className="SigninLink"> Log in to leave a review for this movie</Link></div></div>)
    }
    else{
        const toggleReadMore = () => setReadMore(!readMore)
        
        if(isReviewed){      
            //  if the user has already rated this movie  
            return(
                <div className="review-container">
                    <div className="review">
                        <p className="title">
                            <span className="first">
                                Your Review : 
                            </span>
                        </p>
                        <div className="review-content">
                            {
                            (stateReview.length > 150 && !readMore) ?
                                <>
                                    {(stateReview.slice(0, 150) + "...   ")}
                                    <button onClick={toggleReadMore}>
                                        Read More
                                    </button>
                                </>
                                    :
                                <>
                                    {stateReview + "           "}
                                    {
                                        (stateReview.length > 150 )&& <button onClick={toggleReadMore}> Show Less</button>
                                    }
                                </>                     
                            }
                        </div>
                    </div>
                </div>
            )
        }else{
            //  If the user is logged in and has not rated this movie
            const handelChange = (event) => {
                console.log(event.target.name ,  " ----> ", event.target.value )
                setStateReview(event.target.value)
            }
            const handelSubmit = async (event) => {
                event.preventDefault()
                console.log("setting loading to true")
                setLoadingtrue()

                const data = {
                    user_id : event.target.user_id.value,
                    movie_id : event.target.movie_id.value,
                    review : event.target.review_text.value,
                    username : event.target.username.value,
                    movie_data
                }
                console.log("Data recieved = ", data)
                if(stateReview.length < 1){
                    console.log("submit cancelled because review.length < 1")
                    setAlert("please fill in a review to submit")
                    return
                }
    
                try {
                    console.log("making the post request")
                    const res = await axios.post("/api/reviews/addReview", data)
                    console.log("the response of the post req = ", res.data)
                    console.log("calling load user in the reviews function" )
                    loadUser()
                } catch (error) {
                    console.log("Error in the catch block inn the onSubmit function in the reviews.jsx")
                    console.log("error = ",  error.message)
                }
                setLoadingFalse()
            }

            if(loading){
                return(
                    <div className="review-container">
                        <div class="review">
                            Loading
                        </div>
                    </div>
                    ) 
            }else {
                return(
                    <div className="review-container">
                        <div className="leave-review-container">
                            <form onSubmit={handelSubmit} className="leave-review">
                                    <input type="hidden" value={user._id} name="user_id"/>
                                    <input type="hidden"  value={movieID} name="movie_id" />
                                    <input type="hidden"  value={user.username} name="username"/>
                                    {/* <input type="text" value = {stateReview} name="review_text" onChange={handelChange}/> */}
                                    <textarea value = {stateReview} placeholder="Leave a review" name="review_text" onChange={handelChange}>Leave  review</textarea>
                                    <button type="submit" className="selections-item">Post Review</button>
                            </form>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default Reviews