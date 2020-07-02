import React from "react"
import {sueContext } from "react"

//  IMporting context
import AuthCOntext from "../../../context/Authentication/authenticationContext"
import { Link } from "react-router-dom"
const EditUser = () => {
    const authContext = AuthContext()
    const {isAuthenticated, loadUser, user} = authContext;
    if (isAuthenticated){

        //  -------> update grnre choices
        //  --------> update movie ratings
        //  --------> update profile pic
        //  --------> update recommendation algorithm 

    }else{
        return(
            <Link to="/signin">Sign In</Link>
        )
    }
}