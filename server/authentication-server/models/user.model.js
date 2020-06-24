const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    provider: String,
    profile_pic_url: String,
    name: Object,           // name = {firstName: "...",  lastName: "..."}
    providerID: String,
    email:String
})

const User = mongoose.model( "keep-watching-user", userSchema );

module.exports = User;