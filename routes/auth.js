const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const keys = require("./keys");
const chalk = require("chalk");

const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
router.use(cors());
router.use(passport.initialize());

var user = {};


passport.serializeUser( (user, cb) => {
    cb(null, user);
})

passport.deserializeUser( (user, cb) => {
    cb(null, user)
})

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }
));

//   Facebook auth handellers
router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/");
    }
)


// Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
}));

//  Google Auth handellers
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/google/callback",
passport.authenticate("google"),
(req, res) => {
    res.redirect("/")
});



// const PORT  = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(chalk.green("APP IS LISTENING TO ---++-> " + PORT )));

router.get("/", (req, res)=>{
    res.send("AUTH ROUTE")
})

router.get("/user", (req, res) => {
    console.log("getting user data");
    res.send(user)
})

router.get("/auth/logout", (req, res) => {
    console.log("logging out");
    user ={}
    res.send(user)
})

module.exports = router