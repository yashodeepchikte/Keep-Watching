// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=<API_Key>
// Read more about the API here: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '33bb8436c172b0643a6db970caa59640';
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
    
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';          // Width of the image
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';          // Width of the image

export { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, SEARCH_BASE_URL, POPULAR_BASE_URL };
