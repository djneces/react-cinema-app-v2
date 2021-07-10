import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomBtnFull from '../CustomBtnFull/CustomBtnFull';
import SpinnerDots from '../SpinnerDots/SpinnerDots';
import { v4 as uuidv4 } from 'uuid';
import { DB, TICKET_PRICE } from '../../assets/moviesSeed';
import { createOrder } from '../../store/actions/purchase';
import { calculateTotal } from '../AddOnsSummary/AddOnsUtil';
import './OrderSummary.scss';

const OrderSummary = ({
  selectedMovie,
  selectedSeats,
  fetchedMovies,
  selectedMovieTime,
  selectedMovieTimeDb,
  history,
  location,
  userId,
  createOrder,
  orderIsLoading,
  isAuthenticated,
  addOns,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { movies } = DB;

  //matching selected movie title with fetched movies {}
  const movieOnSelect = movies.find((movie) => {
    if (!selectedMovie) {
      return null;
    }
    return movie.title === fetchedMovies[selectedMovie].title;
  });
  //getting hall # of selected movie
  const movieOnSelectHall = movieOnSelect && movieOnSelect.hall;

  const onClick = () => {
    if (location.pathname === '/movies') history.push('/times');
    if (location.pathname === '/times') history.push('/seats');
    if (location.pathname === '/seats') history.push('/addons');
    if (location.pathname === '/addons' && isAuthenticated) {
      const ticketId = uuidv4().toString().slice(0, 5);
      const createdAt = new Date();
      const ticketOrder = {
        selectedMovie,
        selectedMovieTime,
        selectedMovieTimeDb,
        selectedSeats,
        ticketId,
        createdAt,
        movieOnSelectHall,
        addOns,
        orderTotal: {
          paid: false,
          total: calculateTotal(addOns, selectedSeats, TICKET_PRICE),
        },
      };
      createOrder(ticketOrder, userId, history);
    }
  };

  const renderDisabledBtn = () => {
    let disabled;
    if (location.pathname === '/movies') {
      disabled = !selectedMovie;
    }
    if (location.pathname === '/times') {
      disabled = !selectedMovieTime;
    }
    if (location.pathname === '/seats') {
      disabled = selectedSeats && selectedSeats.length === 0;
    }
    if (location.pathname === '/addons') {
      if (orderIsLoading) {
        disabled = true;
      }
      if (isAuthenticated === false) {
        disabled = true;
      }
    }

    return disabled;
  };

  return (
    <div className='OrderSummary'>
      <div className='OrderSummary__review'>
        {selectedMovie ? (
          <>
            <div className='OrderSummary__review-details'>
              <div className='OrderSummary__review-details--title'>
                <span>Movie:</span>
                <br></br>
                <span>
                  {selectedMovie
                    ? fetchedMovies[selectedMovie].title
                    : 'Please, select a movie'}
                </span>
              </div>
              {/* shows date & time only on times, seats, addons page */}
              {location.pathname === '/times' ||
              location.pathname === '/seats' ||
              location.pathname === '/addons' ? (
                <div className='OrderSummary__review-details--date'>
                  Date & Time:
                  <br></br>
                  {selectedMovieTime ? (
                    <span>{selectedMovieTime}</span>
                  ) : (
                    <span style={{ color: 'grey' }}>Please, select time</span>
                  )}
                </div>
              ) : null}
              {/* shows selected seats only on seats, addons page */}
              {location.pathname === '/seats' ||
              location.pathname === '/addons' ? (
                <>
                  {selectedSeats && selectedSeats.length > 0 && (
                    <div className='OrderSummary__review-details--seats'>
                      Number of seats:
                      <br></br>
                      <span>
                        {selectedSeats &&
                          selectedSeats.length > 0 &&
                          selectedSeats.length}{' '}
                        / Hall: {movieOnSelectHall}
                      </span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <div className='OrderSummary__review-poster'>
              {selectedMovie && (
                <img
                  //added box shadow only after the img loaded
                  className={imageLoaded ? 'boxShadow' : ''}
                  src={fetchedMovies[selectedMovie].posterUrl}
                  alt={fetchedMovies[selectedMovie].title}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
          </>
        ) : (
          <h2>Please, select a movie</h2>
        )}
      </div>

      <div className='OrderSummary__btn'>
        <CustomBtnFull
          onclick={onClick}
          disabled={renderDisabledBtn()}
          width={'w30'}
        >
          <span>
            Continue
            {location.pathname === '/addons' && isAuthenticated === false ? (
              <span>Please, login first</span>
            ) : (
              ''
            )}
          </span>{' '}
          {orderIsLoading && <SpinnerDots />}
        </CustomBtnFull>
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies, seats, auth, orders, addOns }) => ({
  fetchedMovies: movies.fetchedMovies,
  selectedMovie: movies.selectedMovie,
  selectedMovieTime: movies.selectedMovieTime.time,
  selectedMovieTimeDb: movies.selectedMovieTime.dbTime,
  selectedSeats: seats.selectedSeats,
  userId: auth.currentUser?.id,
  isAuthenticated: auth.isAuthenticated,
  orderIsLoading: orders.loading,
  addOns: addOns.addOns,
});

export default withRouter(
  connect(mapStateToProps, { createOrder })(OrderSummary)
);
