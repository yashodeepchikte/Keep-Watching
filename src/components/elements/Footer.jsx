import React from "react"
import FontAwesome from "react-fontawesome"

// importting components
import RMDBLogo from "../images/reactMovie_logo.png"
import TMDBLogo from "../images/tmdb_logo.svg"

// importing styles
import {StyledFooter} from "../styles/StyledFooter"

import { Link } from "react-router-dom";

const Footer = () => (
    <StyledFooter>
        <div className="footer-content">
            <a href = "https://github.com/yashodeepchikte">
                Made with  ❤ by Yashodeep
            </a>
            <a href="https://github.com/yashodeepchikte/Keep-Watching">
                <FontAwesome  className="fa fa-github" name="clock-o" size="1x"/>
            </a>
        </div>
    </StyledFooter>
)



export default Footer