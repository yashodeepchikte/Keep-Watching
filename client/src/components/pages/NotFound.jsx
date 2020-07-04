import React, { useContext, useEffect} from "react"
import {Link } from "react-router-dom"

// importing context 
import AuthContext from "../../context/Authentication/authenticationContext"

const NotFound = () => {
    const authContext = useContext(AuthContext)
    // console.log("AuthContext = ", AuthContext)
    // console.log("authContext = ", authContext)
    const { loadUser} = authContext
    useEffect(()=>{
        loadUser()
     // eslint-disable-next-line
    }, []) 
    return(
        <div>
            <h1>Not Found </h1>
            <h1>
                <Link to="/"> 
                    Home
                </Link>
            </h1>
        </div>
)}

export default NotFound