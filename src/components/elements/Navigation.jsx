import React from "react"
import {Link} from "react-router-dom"

import {StyledNavigation} from "../styles/StyledNavigation"

const Navigation = ({ movie }) => {
   
    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to="/">
                    <p>
                        Home
                    </p>
                </Link>
                <p>|</p>
                <Link to="">

                </Link>
            </div>
        </StyledNavigation>
    )
}

export default Navigation