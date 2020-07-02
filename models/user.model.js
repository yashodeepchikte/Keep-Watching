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
    }
});

module.exports = mongoose.model("Keep-Watching-User", userSchema)