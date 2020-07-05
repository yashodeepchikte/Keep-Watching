const mongoose = require("mongoose")
const Review = require("../models/review.models")
const User = require("../models/user.model")

const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    res.send("reviews route")
})


//  Get all reviews sorted in latest order
router.get("/feed", async  (req, res) => {
    try{
        const reviews = await Review.find({})
        res.status(200).json(reviews)    
    }catch(error){
        console.log("error in getting all the reviews in the reviews.js file ")
        console.log(error.message)
        res.status(500).json(error.message)
    }
})

// get review by its id
router.get("/review/:id", async (req, res) => {

    const reviewID = req.params.id
    console.log("the /review/:id route was called with id = ", reviewID )

    try {
        let review = await Review.findById(reviewID)
        console.log("found review = ", review)
        res.status(200).json(review)
    } catch (error) {
        console.log("error in the catch block of the reviews .js page getreviewById function")
        console.log("ERROR  =>> ", error.message)
        res.status(500).json(error.message)
    }
})
//  get all review fro a perticular movie by a perticular user
router.get("/:movieID/:userID", async  (req, res) => {
    console.log("moveiID = ", req.params.movieID)
    console.log("userID = ", req.params.userID)
    const movieID = req.params.movieID
    try{
        const reviews = await Review.find({tmdbMovieId: tmdbMovieId})
        res.status(200).json(reviews)    
    }catch(err){
        console.log("error in getting all the reviews in the reviews.js file ")
        console.log(error.message)
        res.status(500).json(error.message)
    }
})



//  Add a review 
router.post("/addReview", async (req, res) => {
    data = req.body
    // console.log("data = ", data)
    const NewReview = new Review({
        username: data.username,
        tmdbMovieId: data.movie_id,
        userID: data.user_id,
        review: data.review,
        reting: data.rating,
    })
    const user = await User.findById(data.user_id)
    console.log("Found user = ", user)
    try {
        await NewReview.save()
        user.movies_reviewed.push([data.movie_id, NewReview.id])
        await user.save()
        console.log("New review saved in the database and reviewed_movies array updted")
        res.status(200).json(user)
    } catch (error) {
        console.log("error in the catch block in the router.pst in revies.js route file")
        console.log(error.message)
        res.status(500).json(error.message)
    }
})


module.exports = router 