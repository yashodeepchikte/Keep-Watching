import React from "react"
import PropTypes from "prop-types"


import FontAwesome from "react-fontawesome"
import {calcTime, convertMoney} from "../../../helpers"

import {  StyledMovieInfoBar } from "./StyledMovieInfoBar"
const MovieInfoBar = (  { time, budget, revenue}  ) => (
    <StyledMovieInfoBar>
        <div className="movieinfobar-content">
            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-time" name="clock-o" size="2x" /> 
                <span className="movieinfobar-info">
                    Running Time: {calcTime(time)}
                </span>
            </div>
            
            <div className="movieinfobar-content-col">
                {
                    budget !==0 
                        ?
                        (<>
                            <FontAwesome className="fa-budget" name="Money" size="2x" /> 
                            <span className="movieinfobar-info">
                                Budget: {convertMoney(budget)}
                            </span>
                        </>)
                        :
                        ""
                }
            </div>

            <div className="movieinfobar-content-col">
                {
                    revenue
                        ?
                        (<>
                        <FontAwesome className="fa-revenue" name="ticket" size="2x" /> 
                        <span className="movieinfobar-info">
                            Revenue: {convertMoney(revenue)}
                        </span>
                        </>)
                        :
                         ""
                }
            </div>
        </div>
    </StyledMovieInfoBar>
)

MovieInfoBar.propTypes = {
    time: PropTypes.number,
    budget: PropTypes.number,
    revenue: PropTypes.number
}
export default MovieInfoBar