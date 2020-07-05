import React, {useState, useContext, useEffect}  from "react"
import {  
    IMAGE_BASE_URL, BACKDROP_SIZE, 
    POSTER_SIZE, SEARCH_BASE_URL, 
    POPULAR_BASE_URL 
}
from "../../config"

//  IMport components
import HeroImage from "../components/HeroImage/HeroImage"
import SearchBar from "../components/SearchBar/SearchBar"
import  Grid from "../components/Grid/Grid"
import LoadMoreBtn from "../components/LoadMoreButton/LoadMoreBtn"
import Spinner from "../components/Spinner/Spinner"
import MovieThubm from "../components/MovieThubmnail/MovieThumb"
// import Footer from "../components/Footer/Footer"
import NoImage  from "../images/no_image.jpg"

// importing custom hooks
import useHomeFetch from "../hooks/useHomeFetch"

//  importing context
import AuthContext from "../../context/Authentication/authenticationContext"
const Home =  () =>{
    //    console.log("state = ", state)

    const authContext = useContext(AuthContext)
    // console.log("AuthContext => ", AuthContext)
    // console.log("authContext before loadUser = ", authContext)
     // eslint-disable-next-line
    const {isAuthenticated, loadUser} = authContext
    useEffect(()=>{
        loadUser()
        // console.log("authContext after loadUser = ", authContext)
     // eslint-disable-next-line
    }, [])
    
    const [searchTerm, setSearchTerm] = useState("")
    const [{state, loading, error}, fetchMovies] =  useHomeFetch(searchTerm);
   
   const loadMoreMovies = () =>{
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage+1}`;
    
        const endpoint = searchTerm !== "" ? searchEndpoint : popularEndpoint;
        // console.log("ENDPOINT + =  ", endpoint)
        fetchMovies(endpoint)
   }

   const searchMovies = (search) => {
        const endpoint = search ? SEARCH_BASE_URL + search  : POPULAR_BASE_URL;
        setSearchTerm(search);
        fetchMovies(endpoint);
    }

   if (error) return <div> Something went wromg ....</div>
   if (!state.movies[0]) return <Spinner />
    return (
       <div>
        
           {!searchTerm &&
               (<HeroImage 
               image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
               title={state.heroImage.original_title}
               text={state.heroImage.overview}
           />)}
                 
           <SearchBar callback={searchMovies}/>
           <Grid header={searchTerm ? "Search Results:" : "Popular Movies"}>
                {state.movies.map(movie => (
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
           {loading && <Spinner /> }
           <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
           
       </div>
   )
}

export default Home