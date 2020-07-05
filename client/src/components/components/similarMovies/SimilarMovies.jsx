import React from "react"

import useFetchSimilarMovies from "../../hooks/useFetchSimilarMovies"
import Spinner from "../Spinner/Spinner"
import Grid from "../Grid/Grid"
import MovieThubm from "../MovieThubmnail/MovieThumb"
import NoImage from "../../images/no_image.jpg"
import {  
    IMAGE_BASE_URL, BACKDROP_SIZE, 
    POSTER_SIZE, SEARCH_BASE_URL, 
    POPULAR_BASE_URL 
} from "../../../config"

import "./SimilarMovies.styles.css"

const SimilarMovies = (props) => {
    const movieID = props.movieID
    const [similarMovies, loading, error] = useFetchSimilarMovies(movieID)

       
    if (error){
        return (
            <div>Something went wrong <br/> 
               this is the error ---- {error}
            </div>
        )
    }
    if (loading) return <Spinner />
    return (
        <div>
            {console.log("Final return = ", similarMovies.data)}
            <Grid header={"Similar Movies"}>
                {similarMovies.data.map(movie => (
                    <MovieThubm 
                        key={movie.id}
                        clickable
                        image={movie.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: NoImage}
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                    ))
                }
           </Grid>
        </div>
    )
}

export default SimilarMovies