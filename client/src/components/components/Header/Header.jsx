import React, {useContext, useEffect} from "react"

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
    }, [isAuthenticated, user])
    return(
    <StyledHeader>
        <div className="header-content" style={style}>
            <Link to="/">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo"/>
            </Link>
            {/* <a href="https://www.themoviedb.org/?language=en-US">
                <StyledTMDBLogo src={TMDBLogo} alt="tldb-logo"/>
            </a> */}
            {
                isAuthenticated ?
                <h1>{user ? user.email : ""}
                <LogoutButton />
                </h1>
                :
                <div>
                    
                        <Link to="/signin">Signin</Link>
                   
                    
                        <Link to="/signup">Signup</Link>
                   
                </div>
            }
        </div>
    </StyledHeader>
)
}
export default Header