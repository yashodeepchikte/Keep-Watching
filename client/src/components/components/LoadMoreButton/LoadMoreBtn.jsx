import React from "react"
import PropTypes from "prop-types"


//  importing styles
import { StyledLoadMoreBtn } from "./StyledLoadMoreBtn"

const LoadMoreBtn = ({ text, callback}  ) => (
    <StyledLoadMoreBtn type="button" onClick={callback}>
        {text}
    </StyledLoadMoreBtn>
)

LoadMoreBtn.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
}
export default LoadMoreBtn