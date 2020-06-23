import React from "react"

//  importing component
import Navigation from "./elements/Navigation"
import MovieInfo from "./elements/MovieInfo"
import MovieInfoBar from "./elements/MovieInfoBar"
import Grid from "./elements/Grid"
import Spinner from "./elements/Spinner"
import Actor from "./elements/Actor"


//  importing custom hook
import useMovieFetch from "../components/hooks/useMovieFetch"
const Movie = (props) =>{ 
    
    const movieId = props.match.params.movieId
    const [movie, loading, error] = useMovieFetch(movieId)
    console.log("movie= ",movie)

    if (error) return <div>Something went wrong</div>
    if (loading) return <Spinner />

    return(
        <>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={ movie }/>
            <MovieInfoBar />
            <Grid>
                <Actor />
            </Grid>
        </>
    )
}

export default Movie