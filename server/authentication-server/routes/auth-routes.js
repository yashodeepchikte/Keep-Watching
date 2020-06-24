const express = require("express")

const passport = require("passport")

const router = express.Router()

// auth login
router.get("/login", (req, res) => {
    res.send("Login Page")
})

//  Auth Logout
router.get("/logout", (req, res) => {
    res.send("logging out")
})

//  Auth with google
router.get("/google", passport.authenticate("google", {
    scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}))

//  Google rediect
router.get("/google/redirect",  passport.authenticate("google"), (req, res)=>{
    res.send("google aut redirect")
})
module.exports = router