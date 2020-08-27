import React, {useState, useContext, useEffect}  from "react"
import axios from "axios"
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
import Selections from "../components/selections/selections"
import Feed from "../components/Feed/Feed"
import Recommendation from "../pages/recommendations/Recommendations"

// import Footer from "../components/Footer/Footer"
import NoImage  from "../images/no_image.jpg"

// importing custom hooks
import useHomeFetch from "../hooks/useHomeFetch"

//  importing context
import AuthContext from "../../context/Authentication/authenticationContext"
import Axios from "axios"
const Home =  () =>{

    const authContext = useContext(AuthContext)
     // eslint-disable-next-line
    const {isAuthenticated, loadUser} = authContext

    const [selection, setSelection] = useState("Popular Movies")
    const [movieIndex , setMovieIndex] = useState(0)
    useEffect(()=>{
        loadUser()
        // this will spin up  the recommendation server
        axios.get("https://keepwatching-server.herokuapp.com/")
     // eslint-disable-next-line
    }, [])
    
    const [searchTerm, setSearchTerm] = useState("")
    const [{state, loading, error}, fetchMovies] =  useHomeFetch(searchTerm);

    const [heroImageState, setHeroImageState] = useState({
        image:"",
        title:"",
        text:""
        })
   
    const loadMoreMovies = () =>{
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage+1}`;
    
        const endpoint = searchTerm !== "" ? searchEndpoint : popularEndpoint;
        // console.log("ENDPOINT + =  ", endpoint)
        fetchMovies(endpoint)
   }
    const handelClick = (event) => {
        setSelection(event.target.value)
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
           <Selections handelClick={handelClick} collections={["Popular Movies", "Feed", "Recommendations"]}/>
           {selection ==="Popular Movies" && <Grid header={searchTerm ? "Search Results:" : "Popular Movies"}>
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
                {loading || <LoadMoreBtn text="Load More" callback={loadMoreMovies} />}
           </Grid>}
           {selection==="Feed" && <Feed />}
           {selection==="Recommendations" && <Recommendation/>}
           {loading && <Spinner /> }
           
           
       </div>
   )
}

export default Home