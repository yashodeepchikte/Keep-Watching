 // eslint-disable-next-line
import React, { useContext, useEffect} from "react"

//  importing component
import Navigation from "../components/Navigation/Navigation"
import MovieInfo from "../components/MovieInfo/MovieInfo"
import MovieInfoBar from "../components/MovieInfoBar/MovieInfoBar"
import Grid from "../components/Grid/Grid"
import Spinner from "../components/Spinner/Spinner"
import Actor from "../components/Actor/Actor"
import Rating from "../components/Rating/Rating"

//  importing custom hook
import useMovieFetch from "../hooks/useMovieFetch"

// importing context 
import AuthContext from "../../context/Authentication/authenticationContext"
const Movie = (props) =>{ 
    
    const authContext = useContext(AuthContext)
    // console.log("AuthContext = ", AuthContext)
    // console.log("authContext = ", authContext)
     // eslint-disable-next-line
    const {isAuthenticated, loadUser, user} = authContext
    useEffect(()=>{
        loadUser()
         // eslint-disable-next-line
    }, [isAuthenticated])
    
    const movieId = props.match.params.movieId
    const [movie, loading, error] = useMovieFetch(movieId)
    console.log("MOVIE  = ", movie)
    // console.log("movie= ",movie)

    if (error) return <div>Something went wrong</div>
    if (loading) return <Spinner />

    return(
        <>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={ movie }/>
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
            <Rating movieID={movie.id} />
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