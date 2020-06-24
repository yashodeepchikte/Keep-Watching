import React, {useState}  from "react"
import {  
    IMAGE_BASE_URL, BACKDROP_SIZE, 
    POSTER_SIZE, SEARCH_BASE_URL, 
    POPULAR_BASE_URL 
}
from "../config"

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
//    console.log("state = ", state)
   
   const [searchTerm, setSearchTerm] = useState("")
   
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