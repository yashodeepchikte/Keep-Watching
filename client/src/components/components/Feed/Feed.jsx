import React from "react"

import useReviewsFetch from "../../hooks/useFetchFeed"
import Spinner from "../Spinner/Spinner"
import Grid from "../Grid/Grid"
import {Link} from "react-router-dom"

import {  
    IMAGE_BASE_URL, POSTER_SIZE, 
} from "../../../config"


import "./Feed.Styles.css"

const Feed = () => {
    const [feed, loading, error] = useReviewsFetch()

   
    if (error){
        return (
            <div>Something went wrong <br/> 
               this is the error ---- {error}
            </div>
        )
    }
    if (loading) return <Spinner />

    const getDaysAgo = (difference) => {
        // takes in difference between 2 dates in milliseconds and returns days ago
        const days = Math.floor(difference/(24*60*60*1000))
        const week = Math.floor(days/7)
        const months = Math.floor(days/30)
        const year = Math.floor(months/12)
        // console.log("Days = ", days + "days")
        if(year !== 0) {  
 
            return year + " years ago"
        }else if(months !== 0) {
            return months + " month ago"
        }else if(week !== 0) {
            return week + " month ago"
        }else if(days !== 0){ 
            return days + " month ago"
        }else if(days === 0){    
            return "Today"
        }
    }
    const getDate = (date) => {
        //  Takes in a string and returns a date in the format we want
        var month = ["January", "February", "March", "April", "May", "June", 
                                "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        date = new Date(date)

        const Year = 1900 + date.getYear()
        const Month = month[date.getMonth()]
        const ddate = date.getDate()
        const day = days[date.getDay()]
        const FinalDate =  String(ddate) + " " +String(Month) + " " +String(Year) 
        const postedTime = date.getTime()
        const currentTime = new Date().getTime()
        const DaysAgo = getDaysAgo(currentTime-postedTime)
        // console.log("Days Ago = ", getDaysAgo(currentTime-postedTime))
        return [FinalDate, DaysAgo]
    }


  
    return (
        <>
        <h1 style={{marginLeft: "25px", fontFamily:"helvatica, arial"}}>Feed</h1>
        <div className="feed">
            {
                feed.data.map(review => (
                    <div className="feedBox">
                        
                        <div className="feedBox-container">
                           
                            <div className="thumbnail">
                                <Link to={"/movie/"+review.tmdbMovieId}>
                                    <img src={review.movie_data.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${review.movie_data.poster_path}`: ""}/>
                                </Link>
                            </div>
                            
                            <div className="feedinfo">
                                
                                <div className="username">
                                    <i className="fa fa-user" aria-hidden="true"></i> {review.username}
                                </div>

                                <div className="movie-title">
                                    {review.movie_data.original_title}
                                </div>

                                <div className="review-text">
                                    <p>{review.review.length > 150  ? <span>{review.review.slice(0, 250)}  <Link to={"/movie/"+review.tmdbMovieId}> Read More... </Link> </span>: review.review }</p>
                                    {console.log("review.tmdbMovieId = ", review.tmdbMovieId)}

                                    <span className="postedAt"> 
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>   <span>{ getDate(review.date)[0]}</span>
                                    </span>
                                </div>
                                
                            </div>
                            
                            
                                              
                        </div>

                    </div>
                ))
            }
        </div>
</>
    )
}



export default Feed