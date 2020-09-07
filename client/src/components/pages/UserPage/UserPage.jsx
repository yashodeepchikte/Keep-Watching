 /* eslint-disable no-unused-vars */
 import React, { useContext, useEffect, useState} from "react"
 import { useParams } from "react-router";
import {Link} from "react-router-dom"

import {  

    IMAGE_BASE_URL, BACKDROP_SIZE, 
    POSTER_SIZE, SEARCH_BASE_URL, 
    POPULAR_BASE_URL 
}
from "../../../config"


//   Imporiting all the components
import Spinner from "../../components/Spinner/Spinner"
import FeedItem from "../../components/FeedItem/FeedItem.component"
import {ReactComponent as EggLogo} from "../../images/egg.svg"
import FollowUnfollowButton from "../../components/FolllowUnfollowButton/FollowUnfollowButton"
import Grid from "../../components/Grid/Grid"
import MovieThumb from  "../../components/MovieThubmnail/MovieThumb"
import NoImage from "../../images/no_image.jpg"
import WatchlistGrid from "../../components/watchlistGrid/watchlistGrid"

// Importing Context 
import AuthContext from "../../../context/Authentication/authenticationContext"
// import AlertContext from "../../../context/AlertContext/AlertContext"


//  Inporting hooks
import useUserReviewFech from "../../hooks/useUserReviewsFetch"
import useUserinformationFetch from "../../hooks/useFetchUserInformation"

//  Importing styles
import "./UserPage.styles.css"


const UserPage = (props) => {
    const { userID } = useParams()
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser, user} = authContext
    useEffect(()=>{

        // console.clear()
        loadUser()
        // eslint-disable-next-line
    }, [isAuthenticated])

    const [userReviews, loading, error] = useUserReviewFech(userID)
    const [currentUser, userLoading, userError] = useUserinformationFetch(userID)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    useEffect(()=>{
            if(!userLoading){

                setFollowers(currentUser.data.followers.length)
                setFollowing(currentUser.data.following.length)
            }
    }, [userLoading])
    if(isAuthenticated){
        if (userLoading){
            return (
                <div className="user-page-container">
                    <Spinner/>
                </div>
            )
        }else{
            console.clear()
            console.log("user = <>", user)
            console.log("currrentuser =<> ", currentUser)
            console.log("currentuser.data =<> ", currentUser.data.followers.length)
            return (
                <div className="user-page-container">
               
    
                    <div className="user-info">
    
             
                        <div className="displaypic">
                            <EggLogo />
                            {currentUser.data.email != user.email ? <FollowUnfollowButton user={user}  nextUser={currentUser} setFollowingCount={setFollowing} setFollowersCount={setFollowers}/>: <></> }
                        </div>
                        <div class="grid-container">
                            <div class="grid-item"> 
                                <span className="first">
                                    Username
                                </span>
                                <span className="second">
                                    {currentUser.data && currentUser.data.username}
                                </span>
                            </div>
                            <div class="grid-item">
                                <span className="first">
                                    Name
                                </span>
                                <span className="second">
                                    {currentUser.data && currentUser.data.fname} {currentUser && currentUser.lname}
                                </span>
                            </div>
                            <div class="grid-item">
                                <span className="first">
                                    Email
                                </span>
                                <span className="second">
                                    {currentUser.data && currentUser.data.email}
                                </span>
                            </div>
                            <div class="grid-item"> 
                                <span className="first">
                                    Followers
                                </span>
                                <span  className="second pl5">
                                    {currentUser.data && followers}
                                </span>
                                </div>
                            <div class="grid-item">
                                <span className="first">
                                    Following
                                </span>
                                <span className="second pl5">

                                    {currentUser.data && following}
                                </span>
                            </div>
                            <div class="grid-item">
                                <span className="first">
                                    Reviewes given
                                </span> 
                                <span className="second pl5">
                                   {currentUser.data && currentUser.data.movies_reviewed.length}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="first-row">

                        <div className="activity">
                            <div className="avtivity-title">
                                <span>
                                    Recent activity 
                                </span>
                            </div>
                            <div className="user-reviews">
                                {    
                                    loading ? 
                                    <Spinner />
                                            :
                                    <>
                                    { userReviews.data.length > 0 ?userReviews.data.map(review=>(
                                                <FeedItem review={review} />
                                            )) 
                                                :   
                                            <span className="second medium-font pl5">No Activity</span> 
                                            
                                        } 
                                    </>
                                }
                        
                            </div>
                        </div>

                        <div className="activity">
                            <div className="avtivity-title">
                                <span>
                                {
                                    currentUser.data.email == user.email ?  "Watchlist" : "Some other Information"
                                }   
                                </span>
                                </div>
                                <div className="userWatchlist">
                                {user.watchlist ? 
                                    <WatchlistGrid > 
                                            {   
                                                user.watchlist.map(movie=> {
                                                    return (<MovieThumb 
                                                        key={movie.id}
                                                        image={movie.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: NoImage}
                                                        movieId={movie.id}
                                                        movieName={movie.original_title}
                                                    />)
                                                })
                                            }
                                    </WatchlistGrid>
                                            : 
                                    <span className="second">Wishlist is empty</span>}
                            </div>
                        </div>
                    </div>
        
                </div>
            )
        }
    }else{
        return( 
            <div className="user-page-container">
                <h1>
                    <Link to="/signin"> Signin</Link>
                </h1>
                
            </div>
        )
    }
}

export default UserPage