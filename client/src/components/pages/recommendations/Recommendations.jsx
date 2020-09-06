import React, {useEffect, useContext, useState} from "react"
// eslint-disable-next-line
import {Link} from "react-router-dom"
import axios from "axios"
 
//  importing components
import Spinner from "../../components/Spinner/Spinner"
import Grid from "../../components/Grid/Grid"
import MovieThubm from "../../components/MovieThubmnail/MovieThumb"
import NoImage from "../../images/no_image.jpg"
import Alerts from "../../components/Alerts/Alerts"

//  importing endpoint helpers 
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../../config"
import { API_URL, API_KEY } from "../../../config"

// importing stylesheet
import "./Recommendations.styles.css"

//  importing context 
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

const RecommendationsPage =(props) => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
     // eslint-disable-next-line
    const {user, loading, setLoadingtrue, setLoadingFalse, ratings, loadUser, isAuthenticated} = authContext;
    const {setAlert} = alertContext


    useEffect(  () => {
        loadUser()
        console.log("user = ", user)
        if (user){

            console.log("user.ratings = ", user.ratings )
        }
       
     // eslint-disable-next-line
    }, [ isAuthenticated])


    
    
    const [recommendations, setRecommendations] = useState([])
    useEffect( () => {
        console.log("The use effect for recommendations was called")
        console.log("recommendations in state => ", recommendations)
    }, [recommendations])
// ------------------------------------------------------------------------user based handeler------------------------------------------------
    const generateCollaborativeFilteringRecommendations = async (event) => {

        try {
            console.log("target.value = ", event.target.value)
            const recommender_type = event.target.value
            setLoadingtrue()
                let userRatings = user.ratings;
                let data = {
                    recommender_type: await JSON.stringify(recommender_type),
                    userID: await JSON.stringify(user._id),
                    ratings: await JSON.stringify(userRatings)
                } 
                // console.log("params = ", params)
            
                try{
                    let config = {
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                        }
                    }
                    console.log("userID = ", data.userID);
                    console.log("Ratings = ", data.ratings)
                    data = await JSON.stringify(data)
                    
                    let res = []
                    if (recommender_type=== "userBasedCF"){
                        console.log("making pst request to 'https://keepwatching-server.herokuapp.com/recommendations/usercolaborativefiltering'")
                        res = await axios.post('https://keepwatching-server.herokuapp.com/recommendations/usercolaborativefiltering', data, config)
                    }else{
                        console.log("making pst request to 'https://keepwatching-server.herokuapp.com/recommendations/itemcolaborativefiltering'")
                        res = await axios.post('https://keepwatching-server.herokuapp.com/recommendations/itemcolaborativefiltering', data, config)
                    }
                    console.log("recommendations = ", res.data)
                    
                    
                    
                    console.log("Recommendations id recieved --->  making the tmdb api calls")
                    let recommended_movies = []
                    setLoadingtrue()
                    try{
                        for (let i = 0; i<res.data.length; i++){
                            let id = res.data[i]
                            const endpoint = `${API_URL}movie/${id}?api_key=${API_KEY}`
                            const result = await ( await fetch(endpoint) ).json()
                            console.log("results after the movie call = ", result)
                            recommended_movies.push(result)
                        }
                    }catch(err){
                        console.log("some error in the for loop in the recommendations.jsx")
                    }

                    setRecommendations(recommended_movies)
                    console.log("All the api calls success : - setting loading to false")
                    setLoadingFalse()
                    return 

                }catch(error){
                    setLoadingFalse()
                    console.log("error in the catch block of the attempt to fetch recommendations block in the recommendations.jsx")
                    console.log("error = ", error.message)
                }
                setLoadingFalse()
        } catch (error) {
            setLoadingFalse()
            if(error.message === "Cannot read property 'ratings' of null"){
                
                setAlert("Please Login to use this feature")
            }else{
                console.log("error in the catch block of generateRecommendations in recommendationpage.jsx")
                console.log("error = ", error.message)
            }
        }
    }

  

    

   if (recommendations.length  === 0  || loading){ 
       return(
       <div className="recommendation-container">
            <div className="recommendations">

                <h1>Recommendation</h1>
                {/* <br /> */}
                <Alerts />
                {!isAuthenticated &&<Link to="/signin">Sign in to Get Recommendations</Link>}
                    {
                        loading ?
                        <Spinner />
                        :   
                    <div >
                            <button onClick={generateCollaborativeFilteringRecommendations} value="userBasedCF" className="generateRecBtn">Generate User Based Collaborative Filtering Recommendations</button>
                            <button onClick={generateCollaborativeFilteringRecommendations} value="itemBasedCF" className="generateRecBtn">Generate Item Based Collaborative Filtering Recommendations</button>
                    </div>
                    }
            </div>
        </div>)

    }else if (recommendations.length !== 0){
        
        return(
            <div className="recommendation-route">

                <Grid header="Recommended Movies are:" >
                    {recommendations.map(movie => (
                        <MovieThubm 
                            key={movie.id}
                            clickable
                            image={movie.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: NoImage}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                        ))
                    }
                </Grid>
            </div>
            )
    }
}

export default RecommendationsPage