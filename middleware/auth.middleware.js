const express =  require("express");
const chalk = require("chalk");
const config = require("config")
const  jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    //  get token from the header
    const token = req.header("x-auth-token");       // axios will be saving the token here

    //  check for empty token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        
        const decoded =await  jwt.verify(token, config.get('jwtSecret'));
        
        req.user =await  decoded.user;

        next();
    } catch (error) {
        console.error("the error in middleware = ", error)
        res.status(401).json({ msg: 'Token is not valid' });

    }
}

module.exports = authMiddleware 