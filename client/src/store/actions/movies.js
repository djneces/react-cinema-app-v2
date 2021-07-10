import axios from '../../axios-movies';
import searchYoutube from 'youtube-api-v3-search';
import {
  FETCH_MOVIES,
  SELECT_MOVIE,
  DESELECT_MOVIE,
  YOUTUBE_SEARCH_MOVIE,
  SELECT_MOVIE_TIME,
  DESELECT_MOVIE_TIME,
  CLEAR_MOVIES,
} from './actionTypes';

//start authorization
export const fetchAllMovies = (movies) => async (dispatch) => {
  const API_KEY = process.env.REACT_APP_MOVIE_KEY;
  const urls = movies.map(
    ({ movieId }) => `movie/${movieId}?api_key=${API_KEY}`
  );

  Promise.all(
    urls.map((url) => {
      return axios
        .get(url)
        .then((response) => {
          let movieCollection = {};
          const {
            id,
            title,
            original_language,
            runtime,
            release_date,
            genres,
            homepage,
            vote_average,
            overview,
            backdrop_path,
            poster_path,
          } = response.data;

          const movie = {
            id,
            title,
            overview,
            genres,
            runtime,
            release_date,
            original_language,
            homepage,
            vote_average,
            posterUrl: `https://image.tmdb.org/t/p/original${poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${backdrop_path}`,
          };
          movieCollection = { ...movieCollection, [id]: movie };
          //Promise.all returns []
          return movieCollection;
        })
        .catch((err) => {
          console.error(err);
        });
    })
  ).then((movieCollection) => {
    let fetchedMovies = {};
    //transform array from Promise.all to object (keys are movieIds)
    movieCollection.map(
      (movie) => (fetchedMovies = Object.assign(fetchedMovies, movie))
    );
    dispatch({
      type: FETCH_MOVIES,
      payload: fetchedMovies,
    });
  });
};

//select movie
export const selectMovie = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie,
});

//deselect movie
export const deselectMovie = () => ({
  type: DESELECT_MOVIE,
});

//search movie on Youtube
export const searchOnYoutube = (API_KEY, title) => async (dispatch) => {
  const options = {
    q: `${title} official trailer`,
    part: 'snippet',
    type: 'video',
  };
  const youtubeSearch = await searchYoutube(API_KEY, options);

  dispatch({
    type: YOUTUBE_SEARCH_MOVIE,
    payload: youtubeSearch.items[0].id.videoId,
  });
};

//select movie time
export const selectMovieTime = (time) => ({
  type: SELECT_MOVIE_TIME,
  payload: time,
});

//deselect movie time
export const deselectMovieTime = () => ({
  type: DESELECT_MOVIE_TIME,
});

//clear all fetched movies and selected movie
export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});
