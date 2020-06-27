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

        const {fname, lname, email, password, password2, username} = req.body;

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



module.exports = router