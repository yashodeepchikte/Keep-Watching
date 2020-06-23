import React from "react"

//  importing the style
import { StyledMovieThumb } from "../styles/StyledMovieThumb"
import { Link } from "react-router-dom"

const MovieThumb = ({image, movieId, clickable}) => (
    <Link to={"/movie/"+movieId}>
        <StyledMovieThumb>
            {
                clickable  ? 
                    <img className="clickable" src={image} alt="movie Thumbnail" />
                : 
                    <img src={image} alt = "movie Thumbnail non clickable" />   
            }
        </StyledMovieThumb>
    </Link>
)

export default MovieThumb