import React from "react"
import PropTypes from "prop-types"

// importing Styles
import { StyledGrid, StyledGridContent } from "./StyledGrid"

const Grid = ({ header, children }) =>(
    <StyledGrid>
        <h1>{header}</h1>
        <StyledGridContent>{children}</StyledGridContent>
    </StyledGrid>
)


Grid.propTypes = {
    header: PropTypes.string,
    // children: PropTypes.       -----------> children are auto generated so no proptype checking req
}
export default Grid