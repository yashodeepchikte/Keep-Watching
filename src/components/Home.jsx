import React, {useState}  from "react"
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config"

//  IMport components
import HeroImage from "./elements/HeroImage"
import SearchBar from "./elements/SearchBar"
import  Grid from "./elements/Grid"
import LoadMoreBtn from "./elements/LoadMoreBtn"
import Spinner from "./elements/Spinner"
import MovieThubm from "./elements/MovieThumb"
import NoImage  from "./images/no_image.jpg"

// importing custom hooks
import useHomeFetch from "./hooks/useHomeFetch"

const Home =  () =>{
   const [{state, loading, error}, fetchMovies] =  useHomeFetch();
   console.log("state = ", state)
   
   const [searchTerm, setSetTerm] = useState("")
   
   const loadMoreMovies = () =>{
        const searchEndpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage+1}`;
    
        const endpoint = searchTerm !== "" ? searchEndpoint : popularEndpoint;
        // console.log("ENDPOINT + =  ", endpoint)
        fetchMovies(endpoint)
   }


   if (error) return <div> Something went wromg ....</div>
   if (!state.movies[0]) return <Spinner />
    return (
       <div>
           <HeroImage 
               image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
               title={state.heroImage.original_title}
               text={state.heroImage.overview}
           />
           <SearchBar />
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