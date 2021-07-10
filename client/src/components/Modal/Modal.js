import _ from 'lodash';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllMovies } from '../../store/actions/movies';
import {
  selectMovie,
  deselectMovie,
  searchOnYoutube,
} from '../../store/actions/movies';
import { DB } from '../../assets/moviesSeed';
import './Modal.scss';

const Modal = ({
  history,
  match,
  fetchedMovies,
  fetchAllMovies,
  selectedMovie,
  selectMovie,
  deselectMovie,
  searchOnYoutube,
  youtubeId,
}) => {
  const movieId = +match.params.movie;
  const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;

  let title,
    overview,
    runtime,
    release_date,
    original_language,
    posterUrl,
    backdropUrl;

  useEffect(() => {
    if (_.isEmpty(fetchedMovies)) {
      const { movies } = DB;
      fetchAllMovies(movies);
    }
    searchOnYoutube(API_KEY, title);
  }, [fetchAllMovies, fetchedMovies, searchOnYoutube, title, API_KEY]);

  if (!_.isEmpty(fetchedMovies)) {
    title = fetchedMovies[movieId].title;
    overview = fetchedMovies[movieId].overview;
    runtime = fetchedMovies[movieId].runtime;
    release_date = fetchedMovies[movieId].release_date;
    original_language = fetchedMovies[movieId].original_language;
    posterUrl = fetchedMovies[movieId].posterUrl;
    backdropUrl = fetchedMovies[movieId].backdropUrl;
  }

  const onSelectMovie = () => {
    history.push('/movies');
    //if select clicked 2x for the same movie => deselects
    if (selectedMovie === movieId) {
      deselectMovie();
      return;
    }
    selectMovie(movieId);
  };

  const renderModal = () => {
    if (_.isEmpty(fetchedMovies)) {
      return <div>Loading</div>;
    } else {
      return (
        <div className='Modal__overlay' onClick={() => history.push('/movies')}>
          <img src={backdropUrl} alt={title} />
          <div className='Modal__body' onClick={(e) => e.stopPropagation()}>
            <div className='Modal__body-title'>
              <h2>{title}</h2>
            </div>
            <div className='Modal__body-content'>
              <span>{overview}</span>
              <div className='Modal__body-content-details'>
                <div>
                  <span>Release date: {release_date}</span>
                  <span>Duration: {runtime} mins</span>
                  <span>Language: {original_language?.toUpperCase()}</span>
                </div>
                <div>
                  <i
                    className={`${
                      selectedMovie && selectedMovie === movieId
                        ? 'fas fa-minus-circle'
                        : 'fas fa-plus-circle'
                    }`}
                    onClick={onSelectMovie}
                  ></i>
                </div>
              </div>
              <hr />
            </div>
            <div className='Modal__body-footer'>
              <div className='Modal__body-footer-poster'>
                <img src={posterUrl} alt={title} />
              </div>
              <div className='Modal__body-footer-iframe'>
                <iframe
                  //   width='280'
                  //   height='157'
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div
              className='Modal__body-closeIcon'
              onClick={() => history.push('/movies')}
            >
              <i className='fas fa-times'></i>
            </div>
          </div>
        </div>
      );
    }
  };

  return _.isEmpty(fetchedMovies)
    ? null
    : ReactDOM.createPortal(renderModal(), document.querySelector('#modal'));
};

const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies.fetchedMovies,
  selectedMovie: movies.selectedMovie,
  youtubeId: movies.youtubeId,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchAllMovies,
    selectMovie,
    deselectMovie,
    searchOnYoutube,
  })(Modal)
);
