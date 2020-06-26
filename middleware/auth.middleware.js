const express =  require("express")

const authMiddleware = (req, res, next) => {
    //  get token from the header
    const token = req.header("x-auth-token");       // axios will be saving the token here

    //  check for empty token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}