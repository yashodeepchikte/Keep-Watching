/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react"

// importting components
import RMDBLogo from "../../images/reactMovie_logo.png"
import TMDBLogo from "../../images/tmdb_logo.svg"
import LogoutButton from "../LogoutButton/LogoutButton"
import { ReactComponent as EggLogo } from "../../images/egg.svg"
import Alerts from "../Alerts/Alerts"

//  importing context
import AuthContext from "../../../context/Authentication/authenticationContext"



// importing styles
import { StyledTMDBLogo, StyledRMDBLogo, StyledHeader } from "./StyledHeader";
import { Link } from "react-router-dom";

const Header = () => {
    const authContext = useContext(AuthContext)

    const { isAuthenticated, user, loadUser } = authContext

    const style = { display: "flex", color: "white", justifyContent: "space-between" }
    useEffect(() => {
        // loadUser()
        // console.log("in the header comp authContext = ", authContext)
    }, [isAuthenticated, user])

    const [show, setShow] = useState(false)

    const loginInfo = (
        <div className={show ? "loginInfo" : "loginInfo hidden"}>
            {user && <Link to={"/user/" + user._id}><div className="logininfo-item">My account</div></Link>}
            <div className="logininfo-item">{user ? user.email : ""}</div>
            <div className="logininfo-item">Movies Rated : {user ? user.ratings.length : ""}</div>
            <div className="logininfo-item">Movies Reviewed : {user ? user.movies_reviewed.length : ""}</div>
            <div className="logininfo-item">Movies in Watchlist : {user ? user.watchlist.length : ""}</div>

            <div className="logininfo-item"><LogoutButton /></div>
        </div>
    )

    const toggleShow = () => {

        setShow(!show)
    }



    return (
        <StyledHeader>
            <div className="header-content" style={style}>
                <Link to="/" className="logo">
                    <EggLogo className="logo" />
                </Link>
                {
                    isAuthenticated ?
                        <div className="loginInfo-container" onClick={toggleShow}>
                            <i className={show ? "fa fa-user menu-shown" : "fa fa-user menu-hidden"} aria-hidden="true" onClick={toggleShow}></i>
                            {loginInfo}
                        </div>
                        :
                        <div className="signinButtons">
                            <Link to="/signin" style={{ marginRight: "5px" }}>Sign In </Link>
                            <a href="/"> | </a>
                            <Link to="/signup" style={{ marginLeft: "5px" }}> Signup</Link>
                        </div>
                }
            </div>
        </StyledHeader>
    )
}
export default Header