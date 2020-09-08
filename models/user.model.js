const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    provider: String,
    provider_id: String,
    email: String,
    password: String,


    displaypic_URL: String,
    date:{
        type: Date,
        default: Date.now
    },
    generPreference:{
        type:Array
    },
    ratings:{
        type:Array
    },
    followers:{
        type:Array,
        default: () =>[["5f01c49105651443acc4f823", "yashodeepchikte2520"]]
    },
    following:{
        type: Array
    },
    role:{
        type: String,
        default: () => "user"
    },
    watchlist:{
        type: Array
    },
    movies_reviewed: Array
});

module.exports = mongoose.model("Keep-Watching-User", userSchema)