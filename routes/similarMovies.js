const express = require("express")
const router = express.Router()
const axios = require("axios")

const keys = require("./keys")
const API_KEY = keys.API_KEY
const API_URL = keys.API_URL
 


router.get("/:movieID", async  (req, res) => {
    const movieID = req.params.movieID
    console.log("/api/similarMovies/:movieID route was called with movieID = ", movieID)

    try {
        console.log("movieId =>>  ", movieID)
        console.log("API_key =>> ", API_KEY)
        console.log("URL  =>> ", API_URL+ "movie/"+movieID+"/recommendations?api_key="+API_KEY )
        let similarMovies = await axios.get(API_URL+ "movie/"+movieID+"/recommendations?api_key="+API_KEY)

        console.log("similar movies = ", similarMovies.data.results)
        res.status(200).json(similarMovies.data.results)
        
        
    } catch (error) {
        console.log("error in the catch block of the similarmovies.js page get(/:movieID)")
        console.log("ERROR  =>> ", error.message)
        res.status(500).json(error.message)
    }
})



module.exports = router 