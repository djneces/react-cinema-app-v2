import _ from 'lodash';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchAllMovies } from '../../store/actions/movies';
import MoviesList from '../../components/MoviesList/MoviesList';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ScrollDownArrow from '../../components/ScrollDownArrow/ScrollDownArrow';
import { DB } from '../../assets/moviesSeed';
import './SelectMoviePage.scss';

const SelectMoviePage = ({ fetchedMovies, fetchAllMovies, location }) => {
  useEffect(() => {
    const { movies } = DB;
    if (_.isEmpty(fetchedMovies) && location.pathname === '/movies') {
      fetchAllMovies(movies);
    }
  }, [fetchedMovies, fetchAllMovies, location.pathname]);

  return (
    <div className='SelectMoviePage'>
      <div className='SelectMoviePage__movieSelect'>
        {fetchedMovies && !_.isEmpty(fetchedMovies) ? (
          <MoviesList />
        ) : (
          <div>Loading</div>
        )}
        <OrderSummary />
      </div>
      <div className='SelectMoviePage__scrollIcon'>
        {/* scroll icon only when movies > 6 */}
        {Object.keys(fetchedMovies).length > 6 && <ScrollDownArrow />}
      </div>
    </div>
  );
};
const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies?.fetchedMovies,
});
export default connect(mapStateToProps, { fetchAllMovies })(SelectMoviePage);
