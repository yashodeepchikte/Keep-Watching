import React from "react"

import useReviewsFetch from "../../hooks/useFetchFeed"
import Spinner from "../Spinner/Spinner"
import Feeditem from "../FeedItem/FeedItem.component"
import {Link} from "react-router-dom"



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

    console.log("Feed in feed.jsx ==> ", feed)
    return (


        <div class="feed-container">
            <h1> Feed </h1>
            <div className="feed">
                {
                    feed.data.map(review => (
                        <Feeditem review={review}/>
                    ))
                }
            </div>
        </div>
    )
}



export default Feed





