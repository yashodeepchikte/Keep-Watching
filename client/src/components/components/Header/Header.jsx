/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"

// importting components
import RMDBLogo from "../../images/reactMovie_logo.png"
import TMDBLogo from "../../images/tmdb_logo.svg"
import LogoutButton from "../LogoutButton/LogoutButton"

//  importing context
import AuthContext from "../../../context/Authentication/authenticationContext"



// importing styles
import {StyledTMDBLogo, StyledRMDBLogo, StyledHeader} from "./StyledHeader";
import { Link } from "react-router-dom";

const Header = () => 
{
    const authContext = useContext(AuthContext)

    const {isAuthenticated, user, loadUser } = authContext

    const style = {display: "flex", color:"white", justifyContent:"space-between"}
    useEffect( () => {
        // loadUser()
        // console.log("in the header comp authContext = ", authContext)
    }, [isAuthenticated, user])

    const [show, setShow] = useState(false)
    const loginInfo = (
            <div className="loginInfo">
                <h1>{user ? user.email : ""}</h1>
                <LogoutButton />
            </div>
    )
    const test = "yashodeep";
    const toggleShow = () => {
        setShow(!show)
    }



    return(
    <StyledHeader>
        <div className="header-content" style={style}>
            <Link to="/" className="logo">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo"/>
            </Link>
            {/* <a href="https://www.themoviedb.org/?language=en-US">
                <StyledTMDBLogo src={TMDBLogo} alt="tldb-logo"/>
            </a> */}
            {
                isAuthenticated ?
                <div className="loginInfo-container">
                    <i className="fa fa-user" aria-hidden="true" onClick={toggleShow}></i>
                    {show && loginInfo }
                </div>
                :
                <div className="signinButtons">
                        <Link to="/signin">Sign In</Link>
                        <a href="/">|</a>
                        <Link to="/signup">Signup</Link>
                   
                </div>
            }
        </div>
    </StyledHeader>
)
}
export default Header