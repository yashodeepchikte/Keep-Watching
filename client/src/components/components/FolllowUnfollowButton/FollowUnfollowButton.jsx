 /* eslint-disable no-unused-vars */
 import React, {  useEffect, useState} from "react"
 import axios from "axios"


//   importing styles
import "./FullowUnfollowButton.styles.css"

 const FollowUnfollowButton =  (props) => {
    let {user, nextUser, setFollowing, setFollowers} = props
    let [loading, setLoading] = useState(true)
    let [operationType, setOperationType] = useState("follow")
  

    const user_id = user._id
    const nextUser_id  = nextUser.data._id

    const user_userName = user.username
    const next_user_username = nextUser.data.username

    let userFollowers = user.followers
    let userFollowing = user.following

    let nextFollowers = nextUser.data.followers
    let nextFollowing = nextUser.data.following

    let updatedUserFollowing = userFollowing;
    let updatednextFollowers = nextFollowers;


    useEffect(()=>{
        let operationset = false;
        for(let i =0; i < userFollowing.length ; i++ ){
            if(userFollowing[i][0] == nextUser_id){
                console.log("user already follows rhe next user thus showing unfollow button")
                setLoading(false)
                setOperationType("unfollow")
                operationset = true
                break
            }
        }
        if(!operationset){
            for(let i =0; i < nextFollowing.length ; i++ ){
                if(nextFollowing[i][0] == user_id){
                    if(operationType !="unfollow" ){
                        console.log("operatin type ====> ", operationType)
                        console.log("nrent user showing follow back button")
                        setLoading(false)
                        setOperationType("followBack")
                        break
                    }
                }
            }
        }
        setLoading(false)
    }, [])



     const handelClick =async (event) => {
        setLoading(true)
        event.preventDefault()
        // console.clear()
        console.log("Operation type = ", operationType)

        if(operationType == "follow" || operationType =="followBack"){
            updatedUserFollowing = updatedUserFollowing.filter(following => following[0] != nextUser_id)
            updatednextFollowers = updatednextFollowers.filter(follower => follower[0] != user_id)
            updatedUserFollowing.unshift([nextUser_id, next_user_username])
            updatednextFollowers.unshift([user_id, user_userName])
        }else {
            updatedUserFollowing = updatedUserFollowing.filter(following => following[0] != nextUser_id)
            updatednextFollowers = updatednextFollowers.filter(follower => follower[0] != user_id)
        }

        try{    
            const endpoint = "/api/users/follow"
            const response = await axios.post(endpoint, {
                            user_id,nextUser_id, 
                            updatedUserFollowing, updatednextFollowers})
            setLoading(false)          

            if(operationType == "follow" || operationType =="followBack"){
                setOperationType("unfollow")
            }else{
                for(let i =0; i < nextFollowing.length ; i++ ){
                    if(nextFollowing[i][0] == user_id){
                        console.log("next user follows current user showing follow back button")
                        setLoading(false)
                        setOperationType("followBack")
                        break
                    }else{
                        setOperationType("follow")
                    }
                }
            }
            setFollowers(followers => updatednextFollowers)
            
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