 /* eslint-disable no-unused-vars */
 import React, { useContext, useEffect, useState} from "react"
 import axios from "axios"

import AuthContext from "../../../context/Authentication/authenticationContext"

//   importing styles
import "./FullowUnfollowButton.styles.css"

 const FollowUnfollowButton =  (props) => {
    let {user, nextUser, setFollowingCount, setFollowersCount} = props
    let [loading, setLoading] = useState(true)
    let [success, setSuccess] = useState(false)
    let [operationType, setOperationType] = useState("follow")
    const authContext = useContext(AuthContext)
    const {loadUser} = authContext;
    // console.clear()
    // console.log(user)
    // console.log("currrentuser.data = ", nextUser)
    // console.log("user.followers = ", user.followers)
    // console.log("user.following = ", user.following)

    // console.log("nextUser.data.followers = ", nextUser.data.followers)
    // console.log("nextUser.data.following = ", nextUser.data.following)

    const user_id = user._id
    const nextUser_id  = nextUser.data._id


    let userFollowers = user.followers
    let userFollowing = user.following

    let nextFollowers = nextUser.data.followers
    let nextFollowing = nextUser.data.following

    let updatedUserFollowing = userFollowing;
    let updatednextFollowers = nextFollowers;

    // console.log("user_id = ", user_id)
    // console.log("next_user_id = ", nextUser_id)

    useEffect(()=>{
        if(nextFollowers.includes(user._id)){
            console.log("user already follows rhe nxt user thus showing unfollow button")
            setLoading(false)
            setOperationType("unfollow")
        }else if(nextFollowing.includes(user._id)){
            console.log("The next user follows current user thus showing follow back button")
            setLoading(false)
            setOperationType("followBack")
        }else{
            console.log("Neither of the users follow each other ths showing follow button")
            setLoading(false)
            setOperationType("follow")
        }
    }, [])



     const handelClick =async (event) => {
        setLoading(true)
        event.preventDefault()
        console.clear()
        console.log("Operation type = ", operationType)

        if(operationType == "follow" || operationType =="followBack"){
            updatedUserFollowing = updatedUserFollowing.filter(following_id => following_id != nextUser_id)
            updatednextFollowers = updatednextFollowers.filter(follower_id => follower_id != user_id)
            updatedUserFollowing.push(nextUser_id)
            updatednextFollowers.push(user_id)

        }else {
            updatedUserFollowing = updatedUserFollowing.filter(following_id => following_id != nextUser_id)
            updatednextFollowers = updatednextFollowers.filter(follower_id => follower_id != user_id)
        }

        try{    
            const endpoint = "/api/users/follow"
            const response = await axios.post(endpoint, {
                            user_id,nextUser_id, 
                            updatedUserFollowing, updatednextFollowers})
            setLoading(false)          
            if(operationType == "follow"||operationType=="followBack"){
                setFollowersCount(followers => followers + 1)
                setOperationType("unfollow")
            }else{
                setFollowersCount(followers => {
                    return followers > 0 ? followers -1 : 0
                })
                setOperationType("follow")
            }
        }catch{
            console.log("Some error in following the user")
        }
     }

     if(loading){
         return <button className="follow-btn-disabled" disabled>Loading </button>
     }else{
        if(operationType=="follow"){
            return(
               <button className={"follow-btn-" + operationType} onClick={handelClick}>Follow </button>
            )
        }else if(operationType == "followBack"){
            return(
                <button className={"follow-btn-" + operationType} onClick={handelClick}>Follow Back</button>
             )
        }else{
            return(
                <button className={"follow-btn-unfollow"} onClick={handelClick}>Unfollow </button>
             )
        }
     }
}

export default FollowUnfollowButton