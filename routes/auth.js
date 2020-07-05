const express = require('express');
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require("chalk")
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const keys = require("./keys");

const config = require('config');
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require('express-validator');


const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
router.use(cors({
    origin: "http://localhost:5000",      // <------- host for the react app
    credentials: true
}));
router.use(passport.initialize());

const User = require("../models/user.model")

//  Route       ----->     Get api/auth
//  Description ----->   Get the logged in user
//  Access      -------->  Private
router.get("/", auth, async (req, res)=>{
    try {
        // console.log("inside the get api/aut req.body = ", req.body)
        // console.log("inside the get api/auth req.user = ", req.user)
        const user = await User.findById( req.user.id ).select("-password");
        // console.log("inside the get api/auth user found in the database = ", user)
        res.json(user);
    } catch (error) {
        console.error("error in get route in Auth.js in routes folder", error.message)
        res.status(500).send("server error")
    }
})


//  Route       ----->     Post api/auth
//  Description ----->   Authenticate a local login attempt and generate jws token
//  Access      -------->  Public
router.post("/", 
                [
                    check("email", "Please Include a valid email").isEmail(),               // Express validator 
                    check("password", "Password is required").exists(),                     // validating the inputs
                ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array()});
            }   

            const {email, password} = req.body;

            try {
                let user = await User.findOne({email});

                if (!user){
                    return res.status(400).json({msg: 'Invalid Credentials --> Email'});
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if(!isMatch){
                    return res.status(400).json({msg: 'Invalid Credentials --> Password'});
                }
                
                const payload = {
                    user: {
                      id: user.id,
                    },
                };
                
                
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    {
                      expiresIn: 360000,
                    },
                    (err, token) => {
                      if (err) throw err;
                      res.json({token});
                    },
                  );
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error');
            }
})



//  ------------------------GOOGLE LOGIN-------------------------
passport.serializeUser( (user, cb) => {
    cb(null, user);
})

passport.deserializeUser( (user, cb) => {
    cb(null, user)
})

//  Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, cb) => {

    try {
        
        const provider = "google";
        const username = profile.displayName;
        const fname  = profile.name.givenName
        const lname = profile.name.familyName
        const displaypic_URL = profile._json.picture
        const  provider_id= profile.id
        const email = profile._json.email
    
        // console.log("------------------<><><><><><>-----------------")
        // console.log("_json = ", profile._json)
        // console.log("------------------<><><><><><>-----------------")
    
        const foundUser = await User.findOne({email})
        let id = -1
        if(!foundUser){
            //  create a new user
            const newUser = new User({
                provider,
                username, 
                fname,
                lname,
                displaypic_URL,
                provider_id,
                email
            })

            await newUser.save()
            console.log("New user was saved to the database")
            console.log(newUser)
            console.log("ID for the New user = ", newUser.id)
            id = newUser.id

            // res.send("New user saved")
            // return cb(null, profile);

        }else{
            //  User already exists
            // return cb(null, foundUser);
            id = foundUser.id
        }
        if (id !== -1){

            const payload = {                   // we will be using the mongoose id rather that the provider id
                user: {
                  id,
                },
              };
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                  expiresIn: 360000,
                },
                (err, token)=>{
                  
                  if (err){
                      console.error("some error in creating token")
                      throw err;
                      res.status(500).json({"msg": "Server error in creating jwt in users.js file in the post route"})
                  } 
                  cb(err, token)
                }
            )
        }else{
            console.log("Problem with id generation in auth.js file google strategy section")
            return
        }
    } catch (error) {
        console.log(chalk.yellow("error in cath statement in creating user from google data in auth get api/auth/google"))
        console.log(error.message)
    }
}));

//  Google Auth handellers
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/callback",
passport.authenticate("google"),
(req, res) => {
    console.log("req.user = ", req.user)
    // localStorage.setItem("token", req.user)
    // localStorage.setItem('token', action.payload.token);
    // console.log("req.body = ", req.body)
    // id = req.user.id

    // res.redirect("http://localhost:3000/")
    res.json(req.user)
});

// router.get("/google", (req, res)=>{
//     res.send("google route")
// } )

module.exports = router