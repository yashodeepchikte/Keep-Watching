const express = require('express');
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require("chalk")
const config = require('config');
const { uuid } = require('uuidv4');
// const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User =  require("../models/user.model")

const router = express.Router();


router.get("/", (req, res) => {
    res.send("API Users route")
})

router.get("/", (req, res) => {
    res.send("api/users/ route")
})

//   create user
//  route ------> api/users/
router.post("/", 
    [                               // express - validator
        check("email", "Please provide a valid email").isEmail(),
        check("username", "Please provide a valid user name").isLength({min: 3}),
        check("password", "Please provide a password at least 6 characters").isLength({min: 6}),
        check("password2", "Please confirem the password").exists(),
        check("fname", "First name is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.error("Errors in express-validator = ", errors)
            return res.status(400).json( { errors: errors.array() } );
        }

        const {fname, lname, email, password, password2, username, generPreference} = req.body;

        try {
            console.log(chalk.yellow("email:", email))
            let user = await User.findOne( { email } )

            if(user){
                console.error("ERROR:")
                console.log(chalk.red("user already exists returnining with 400 ", user))
                return res.status(400).json( { msg: "Email already exists try logging in" } )
            }else if(password !== password2){
                return res.status(400).json( { msg: "passwords dont match" } )
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                email,
                username,
                password: hashedPassword,
                fname,
                lname,
                generPreference,
                provider: "email",
                provider_id: uuid()
            })

            await user.save()
            console.log(chalk.green("user saved"))
            console.log(chalk.yellow(user))
            // res.send("user saved")

            //  Creating the token

            const payload = {                   // we will be using the mongoose id rather that the provider id
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
                  (err, token)=>{
                    
                    if (err){
                        console.error("some error in creating token")
                        throw err;
                        res.status(500).json({"msg": "Server error in creating jwt in users.js file in the post route"})
                    } 
                    res.json({token});
                  }
              )
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error (in User.Post.catch) catch")
        }
});

//   Update a user
router.post("/update", async (req, res) => {
    console.log("i made it to the correct  update function")
    try{
        const {userID, updateField, updatedValues} = req.body;

       

        User.findByIdAndUpdate(userID, { ratings:  updatedValues },  (err, doc) => {
            if(err){
                console.error(err)
            }else{
                console.log("doc = ", doc)
                doc.ratings = updatedValues
                doc.save()
                res.json(doc)

            }
        })
    }catch(err){
        console.log("some error in the catch block on the update user route in the user router file")
        console.error(err.message)
        res.status(500).json("server error ")
    }
})


//  Get a user from their user id
router.get("/:userID", async (req, res) => {
    const {userID} = req.params;
    console.log("user id =><<<<<<<<<>>> ", userID)
    const user =await User.findOne({_id: userID})
    console.log("User =<<<<<<<<<<.", user)
    res.status(200).json(user)
})



//  Follow or un follow users
router.post("/follow", async(req, res) => {
    // console.log("req.body = ", req.body)
    // console.log("user_id = ", req.body.user_id)
    console.log("updatedUserFollowing = ", req.body.updatedUserFollowing)
    console.log("updatednextFollowers = ", req.body.updatednextFollowers)
    // console.log("nextUser_id = ", req.body.nextUser_id)

    try{
        const user = await User.findByIdAndUpdate({_id: req.body.user_id}, {"following" : req.body.updatedUserFollowing})
        // console.log("user  = ", user)
        const next_user = await User.findByIdAndUpdate({_id: req.body.nextUser_id}, {"followers" : req.body.updatednextFollowers})
        // console.log("next user= ", next_user)
        res.status(200).send("Success")
    }catch(error){
        console.log("some errror in updating the followers in  the database")
        console.error(error.message)
    }

})

//  Add remove movies from watchlist
router.post("/updateWatchlist", async(req, res)=>{
    console.log("req.body = ", req.body)
    const {watchlist, userID} = req.body;
    console.log("watchlist<<<<<<<", watchlist)
    console.log("userid<<<<<", userID)
    try{
        const oldwatchlist = await User.findByIdAndUpdate({_id: userID}, {"watchlist" : watchlist})
        console.log("old watchlist  = ", oldwatchlist)
        // const next_user = await User.findByIdAndUpdate({_id: req.body.nextUser_id}, {"followers" : req.body.updatednextFollowers})
        // console.log("response2 = ", next_user)
        res.status(200).send(oldwatchlist)
    }catch(error){
        console.log("some errror in updating the watchlist the followers in  the database")
        console.error(error.message)
    }
})
module.exports = router