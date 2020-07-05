import React  from "react"

import useReviewsFetch from "../../hooks/useReviewsFetch"
import Spinner from "../Spinner/Spinner"

import "./ShowReviews..styles.css"

const ShowReviews = (props) => {
    const movieID = props.movieID
   

    const [movie_reviews, loading, error] = useReviewsFetch(movieID)

    if (error) return <div>Something went wrong</div>
    if (loading) return <Spinner />


    return(
        <div className="ShowReviews">

        {
            movie_reviews.data.length === 0 && <div className="reviewBox"><h1>No Reviews</h1></div>
        }         
        {
            movie_reviews.data.length !== 0 && 
            movie_reviews.data.map(review => (
            <div className="reviewBox">
                <div className="reviewBox-container">
                    <h3><i className="fa fa-user" aria-hidden="true"></i> {review.username}</h3>
                    <h4>Review: {review.review}</h4>
                </div>
            </div>))
        }   
        </div>
    )
}

export default ShowReviews