import React from "react"

// importting components
import RMDBLogo from "../images/reactMovie_logo.png"
import TMDBLogo from "../images/tmdb_logo.svg"

// importing styles
import {StyledTMDBLogo, StyledRMDBLogo, StyledHeader} from "../styles/StyledHeader";

const Header = () => (
    <StyledHeader>
        <div className="header-content">
            <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo"/>
            <StyledTMDBLogo src={TMDBLogo} alt="tldb-logo"/>
        </div>
    </StyledHeader>
)

export default Header