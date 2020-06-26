const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const keys = require("./keys");
const chalk = require("chalk");

const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
app.use(cors());
app.use(passport.initialize());

var user = {};

app.get("/", (req, res) => {
    res.send("WORKS")
})

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
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
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
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
passport.authenticate("google"),
(req, res) => {
    res.redirect("/")
});



const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => console.log(chalk.green("APP IS LISTENING TO ---++-> " + PORT )));

app.get("/user", (req, res) => {
    console.log("getting user data");
    res.send(user)
})

app.get("/auth/logout", (req, res) => {
    console.log("logging out");
    user ={}
    res.send(user)
})