import React from "react"

const Movie = (props) =>{ 
    
    console.log("movie ID = ",  props.match.params.movieId)

    return(<h1>Movie</h1>)
}

export default Movie