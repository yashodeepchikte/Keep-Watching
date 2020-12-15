/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom"

import {

    IMAGE_BASE_URL, BACKDROP_SIZE,
    POSTER_SIZE, SEARCH_BASE_URL,
    POPULAR_BASE_URL
}
    from "../../../config"


//   Imporiting all the components
import Spinner from "../../components/Spinner/Spinner"
import FeedItem from "../../components/FeedItem/FeedItem.component"
import { ReactComponent as EggLogo } from "../../images/egg.svg"
import FollowUnfollowButton from "../../components/FolllowUnfollowButton/FollowUnfollowButton"
import Grid from "../../components/Grid/Grid"
import MovieThumb from "../../components/MovieThubmnail/MovieThumb"
import NoImage from "../../images/no_image.jpg"
import WatchlistGrid from "../../components/watchlistGrid/watchlistGrid"
import AddToWatchList from "../../components/AddToWatchList/AddToWatchList"

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
    const { isAuthenticated, loadUser, user } = authContext

    useEffect(() => {

        // console.clear()
        loadUser()
        // eslint-disable-next-line
    }, [isAuthenticated])

    const [userReviews, loading, error] = useUserReviewFech(userID)
    const [currentUser, userLoading, userError] = useUserinformationFetch(userID)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        if (!userLoading) {

            setFollowers(currentUser.data.followers)
            setFollowing(currentUser.data.following)
        }
    }, [userLoading])
    useEffect(() => {
        console.log("Use effect for followers called")
    }, [followers]);
    if (isAuthenticated) {
        if (userLoading) {
            return (
                <div className="user-page-container">
                    <Spinner />
                </div>
            )
        } else {
            // console.clear()
            // console.log("user.followers = <>", user.following)
            // console.log("currrentuser =<> ", currentUser)
            // console.log("currentuser.followers =<> ", currentUser.data.followers)
            console.log("Followers = ", followers)
            // console.log("following = ", following)
            return (
                <div className="user-page-container">


                    <div className="user-info">


                        <div className="displaypic">
                            <EggLogo />
                            {currentUser.data.email != user.email ? <FollowUnfollowButton user={user} nextUser={currentUser} setFollowing={setFollowing} setFollowers={setFollowers} /> : <></>}
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
                                <span className="second pl5">
                                    {currentUser.data && followers.length}
                                </span>
                            </div>
                            <div class="grid-item">
                                <span className="first">
                                    Following
                                </span>
                                <span className="second pl5">

                                    {currentUser.data && following.length}
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
                                    Followers
                                </span>
                            </div>
                            <div className="userWatchlist">
                                <div classNam="user-reviews">
                                    {
                                        followers.length > 0 ?
                                            followers.map(follower => {
                                                return (
                                                    <div className="styled-border m5 p5">
                                                        <Link to={"/user/" + follower[0]}><i className="fa fa-user" aria-hidden="true"></i> {follower[1]}</Link>
                                                    </div>
                                                )
                                            })
                                            :
                                            <span className="second">No Followers</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="activity">
                            <div className="avtivity-title">
                                <span>
                                    Following
                                </span>
                            </div>
                            <div className="userWatchlist">
                                <div classNam="user-reviews">
                                    {
                                        following.length > 0 ?
                                            following.map(follower => {
                                                return (
                                                    <div className="styled-border m5 p5">
                                                        <Link to={"/user/" + follower[0]}><i className="fa fa-user" aria-hidden="true"></i> {follower[1]}</Link>
                                                    </div>
                                                )
                                            })
                                            :
                                            <span className="second">Not Following any user</span>
                                    }
                                </div>
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
                                            {userReviews.data.length > 0 ? userReviews.data.map(review => (
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
                                        currentUser.data.email == user.email ? "Watchlist" : "Some other Information"
                                    }
                                </span>
                            </div>
                            <div className="userWatchlist">

                                {
                                    currentUser.data.email == user.email ?

                                        (
                                            user.watchlist ?
                                                <WatchlistGrid >
                                                    {
                                                        user.watchlist.map(movie => {
                                                            return (
                                                                <div style={{ position: "relative" }}>
                                                                    <MovieThumb
                                                                        key={movie.id}
                                                                        image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                                                                        movieId={movie.id}
                                                                        movieName={movie.original_title}
                                                                    />
                                                                    <AddToWatchList movieID={movie.id} movieInfo={movie} tick={true} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </WatchlistGrid>
                                                :
                                                <span className="second">Wishlist is empty</span>
                                        ) :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            )
        }
    } else {
        return (
            <div className="user-page-container">
                <h1>
                    <Link to="/signin"> Signin</Link>
                </h1>

            </div>
        )
    }
}

export default UserPage