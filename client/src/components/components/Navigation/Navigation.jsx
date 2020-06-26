import React from "react"
import PropTypes from "prop-types"

import {Link} from "react-router-dom"

import {StyledNavigation} from "./StyledNavigation"

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

Navigation.propTypes={
    movie: PropTypes.string
}

export default Navigation