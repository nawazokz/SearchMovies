import axios from 'axios';
import {apiKey} from '../src/components/constants.js';
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesApiEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const UpcommingMoviesApiEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const TopRatedMoviesApiEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const personDetailEndpoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const movieDetailEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCraditsEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviesPoster =
  'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg';
export const fallbackPersonPoster =
  'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesApiEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(UpcommingMoviesApiEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(TopRatedMoviesApiEndpoint);
};
export const fetchMovieDetail = id => {
  return apiCall(movieDetailEndpoint(id));
};
export const fetchMovieCridits = id => {
  return apiCall(movieCraditsEndpoint(id));
};
export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchPersonDetail = id => {
  return apiCall(personDetailEndpoint(id));
};
export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};
export const fetchSearchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
};
