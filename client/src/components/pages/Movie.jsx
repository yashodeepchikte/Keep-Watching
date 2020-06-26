import React from "react"

//  importing component
import Navigation from "../components/Navigation/Navigation"
import MovieInfo from "../components/MovieInfo/MovieInfo"
import MovieInfoBar from "../components/MovieInfoBar/MovieInfoBar"
import Grid from "../components/Grid/Grid"
import Spinner from "../components/Spinner/Spinner"
import Actor from "../components/Actor/Actor"

//  importing custom hook
import useMovieFetch from "../hooks/useMovieFetch"

const Movie = (props) =>{ 
    
    const movieId = props.match.params.movieId
    const [movie, loading, error] = useMovieFetch(movieId)
    // console.log("movie= ",movie)

    if (error) return <div>Something went wrong</div>
    if (loading) return <Spinner />

    return(
        <>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={ movie }/>
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
            <Grid header="Actors">
                {
                    movie.actors.map( actor => (
                        <Actor key={actor.credit_id} actor={actor} />
                    ))
                }
            </Grid>
        </>
    )
}

export default Movie