import React, {useState, useContext, useEffect}  from "react"
import {  
    IMAGE_BASE_URL, BACKDROP_SIZE, 
    POSTER_SIZE, SEARCH_BASE_URL, 
    POPULAR_BASE_URL 
}
from "../../../config"

//  Import components
import SearchBar from "../../components/SearchBar/SearchBar"
import grid from "../../components/Grid/Grid"
import LoadMoreBtn from "../../components/LoadMoreButton/LoadMoreBtn"
import Spinner from "../../components/Spinner/Spinner"
import MovieThubm from "../../components/MovieThubmnail/MovieThumb"
import NoImage  from "../../images/no_image.jpg"
import Footer from "../../components/Footer/Footer"

// importing custom hooks
import useHomeFetch from "../../hooks/useHomeFetch"

//  importing context
import AuthContext from "../../../context/Authentication/authenticationContext"