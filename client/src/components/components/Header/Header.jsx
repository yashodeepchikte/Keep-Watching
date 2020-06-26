import React from "react"

// importting components
import RMDBLogo from "../../images/reactMovie_logo.png"
import TMDBLogo from "../../images/tmdb_logo.svg"

// importing styles
import {StyledTMDBLogo, StyledRMDBLogo, StyledHeader} from "./StyledHeader";
import { Link } from "react-router-dom";

const Header = () => (
    <StyledHeader>
        <div className="header-content">
            <Link to="/">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo"/>
            </Link>
            <a href="https://www.themoviedb.org/?language=en-US">
                <StyledTMDBLogo src={TMDBLogo} alt="tldb-logo"/>
            </a>
        </div>
    </StyledHeader>
)

export default Header