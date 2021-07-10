import React from 'react';

import MovieItem from './MovieItem/MovieItem';
import { DB } from '../../assets/moviesSeed';
import './MoviesList.scss';

const { movies } = DB;

const MoviesList = () => {
  const movieList = movies.map(({ movieId }) => (
    <MovieItem key={movieId} movieId={movieId} />
  ));
  return <div className='MoviesList'>{movieList}</div>;
};

export default MoviesList;
