import React from "react"
import {Link} from "react-router-dom"

import "./FeedItem.Style.css"

import {  
    IMAGE_BASE_URL, POSTER_SIZE, 
} from "../../../config"

import  {
    getDate, 
    getDaysAgo
} from "./utils"

const FeedItem = (props) => {
    let {review} = props
    console.log("Review.movie_data ==>> ", review.movie_data)
    if (review.movie_data){
        return (
        <div className="feeditem">
            <img src={review.movie_data.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${review.movie_data.poster_path}`: ""}/>
            <div className="feed-info">
                <div className="movie-title">
                    {review.movie_data.original_title}
                </div>

                <div className="username">
                    <i className="fa fa-user" aria-hidden="true"></i> {review.username}
                </div>

                <div className="postedAt"> 
                    <i className="fa fa-clock-o" aria-hidden="true"></i>   <span>{ getDate(review.date)[0]}</span>
                </div>

                <div className="review-text">
                        <p>{review.review.length > 150  ? <span>Review :   {review.review.slice(0, 250)}  <Link to={"/movie/"+review.tmdbMovieId}> Read More... </Link> </span>: "Review : " + review.review }</p>
                    </div>      
            </div>
        </div>
        
        )
    }else{
        return ""
    }
}


export default FeedItem