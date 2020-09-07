
import React from "react"
import PropTypes from "prop-types"

// importing Styles
import "./watchlistgrid.css"
const WatchlistGrid = ({ header, children }) =>(
    <div className="watchlist-grid">
        <h1>{header}</h1>
        <div className="watchlist-content">{children}</div>
    </div>
)


export default WatchlistGrid