import React from "react"
import PropTypes from "prop-types"



//  importing the style
import { StyledMovieThumb } from "./StyledMovieThumb"
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

MovieThumb.propTypes={
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}

export default MovieThumb