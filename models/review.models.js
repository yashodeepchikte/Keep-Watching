const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    username: String,
    tmdbMovieId: String,
    userID: String,
    review: String,
    reting: Number,
    date: {
        type: Date,
        default: Date.now
    },
    movie_data: Object
})

module.exports = mongoose.model("Keep-Watching-Review", reviewSchema)
