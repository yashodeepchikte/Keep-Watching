const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require("chalk")
const config = require('config');
// const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require("../models/user.model")

//  Route       ----->     Get api/auth
//  Description ----->   Get the logged in user
//  Access      -------->  Private
router.get("/", (req, res)=>{
    res.send("api/auth route")
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
                if (config.get("jwtSecret")){
                    console.log(chalk.green("JWT = ", config.get("jwtSecret")))
                }else{
                    console.log(chalk.red("Something is wrong with config.get(jwtsectete) in the auth.js file"))   
                }
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
                console.error(err.message);
                res.status(500).send('Server Error');
            }
})

module.exports = router