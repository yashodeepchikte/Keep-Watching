 /* eslint-disable no-unused-vars */
 import React, { useContext, useEffect, useState} from "react"
 import { useParams } from "react-router";
import {Link} from "react-router-dom"
//   Imporiting all the components
import Spinner from "../../components/Spinner/Spinner"
import FeedItem from "../../components/FeedItem/FeedItem.component"
import {ReactComponent as EggLogo} from "../../images/egg.svg"

// Importing Context 
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"


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


    if(isAuthenticated){
        if (userLoading){
            return (
                <div className="user-page-container">
                    <Spinner/>
                </div>
            )
        }else{
            console.log("user ====> ", user)
            console.log("current user.data = ", currentUser.data)
            return (
                <div className="user-page-container">
               
    
                    <div className="user-info">
    
             
                        <div className="displaypic">
                            <EggLogo />
                            {currentUser.data.email != user.email ?  <button class="follow-btn">Follow </button> : <></>}
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
                                <span  className="second">

                                </span>
                                </div>
                            <div class="grid-item">
                                <span className="first">
                                    Following
                                </span>
                                <span className="second">

                                </span>
                            </div>
                            {/* <div class="grid-item">movies reviewed : {user && user.movies_reviewed.length}</div> */}
                            {/* <div class="grid-item">7</div>
                            <div class="grid-item">8</div>
                            <div class="grid-item">9</div> */}
                        </div>
                        {/* <div>
                            <div>
                                userName : {user && user.username}
                            </div>
                            <div>
                                Name : {user && user.fname} {user && user.lname}
                            </div>
                            <div>
                                email : {user && user.email}
    
                            </div>
                            <div>
    
                                Followers
                            </div>
                            <div>
    
                                Following
                            </div>
                            <div>
    
                                movies reviews
                            </div>                            
    
                   
                        </div> */}
                    </div>
    
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
                                
                            userReviews.data.map(review=>(
                                    <FeedItem review={review} />
                                )
                                )  
                            }
                    
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