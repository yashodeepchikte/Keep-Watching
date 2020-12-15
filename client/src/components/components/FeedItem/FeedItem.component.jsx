import React from "react"
import { Link } from "react-router-dom"

import "./FeedItem.Style.css"

import {
    IMAGE_BASE_URL, POSTER_SIZE,
} from "../../../config"

import {
    getDate,
    getDaysAgo
} from "./utils"

const FeedItem = (props) => {

    let { review } = props
    // console.log("Review.movie_data ==>> ", review.movie_data)
    if (review.movie_data) {
        return (
            <div className="feeditem">
                <Link to={"/movie/" + review.movie_data.id}>
                    <img src={review.movie_data.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${review.movie_data.poster_path}` : ""} />
                </Link>
                <div className="feed-info">
                    <div className="movie-title">
                        {review.movie_data.original_title}
                    </div>

                    <div className="username">
                        <Link to={"/user/" + review.userID}>
                            <i className="fa fa-user" aria-hidden="true"></i>  {review.username}
                        </Link>
                    </div>

                    <div className="postedAt">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>   <span>{getDate(review.date)[0]}</span>
                    </div>

                    <div className="review-text">
                        <p>
                            {review.review.length > 150 ?
                                <span><strong>Review :</strong>   {review.review.slice(0, 250)}  <Link to={"/movie/" + review.tmdbMovieId}> Read More... </Link> </span>
                                :
                                <span>
                                    <strong>Review :</strong> {review.review}
                                </span>
                            }
                        </p>
                    </div>
                </div>
            </div>

        )
    } else {
        return ""
    }
}


export default FeedItem