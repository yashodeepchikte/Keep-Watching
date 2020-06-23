import React from "react"

//  importing styles
import { StyledLoadMoreBtn } from "../styles/StyledLoadMoreBtn"

const LoadMoreBtn = ({ text, callback}  ) => (
    <StyledLoadMoreBtn type="button" onClick={callback}>
        {text}
    </StyledLoadMoreBtn>
)

export default LoadMoreBtn