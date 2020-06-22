import React from "react"

//  importing the style
import { StyledMovieThumb } from "../styles/StyledMovieThumb"

const MovieThumb = ({image, movieId, clickable}) => (
    <StyledMovieThumb>
        {
            clickable  ? 
                <img className="clickable" src={image} alt="movie Thumbnail" />
             : 
                <img src={image} alt = "movie Thumbnail non clickable" />   
        }
    </StyledMovieThumb>
)

export default MovieThumb