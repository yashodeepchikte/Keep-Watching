import React, {useState, useEffect}  from "react"
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config"

//  IMport components
import HeroImage from "./elements/HeroImage"
import SearchBar from "./elements/SearchBar"
import  Grid from "./elements/Grid"
import LoadMoreBtn from "./elements/LoadMoreBtn"
import Spinner from "./elements/Spinner"
import MovieThubm from "./elements/MovieThumb"

// importing custom hooks
import useHomeFetch from "./hooks/useHomeFetch"

const Home = () =>{

   const [{state, loading, error}, fetchMovies] = useHomeFetch()
   console.log("state = ", state)

    return (
       <>
           <HeroImage />
           <SearchBar />
           <Grid />
           <MovieThubm />
           <Spinner />
           <LoadMoreBtn />
       </>
   )
}

export default Home