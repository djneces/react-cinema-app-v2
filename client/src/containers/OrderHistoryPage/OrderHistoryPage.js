import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrderHistory } from '../../store/actions/orderHistory';
import { fetchAllMovies } from '../../store/actions/movies';
import OrderList from '../../components/OrderList/OrderList';
import SpinnerDots from '../../components/SpinnerDots/SpinnerDots';
import { DB } from '../../assets/moviesSeed';
import './OrderHistoryPage.scss';

class OrderHistoryPage extends Component {
  componentDidMount() {
    const {
      userId,
      isAuthenticated,
      fetchOrderHistory,
      orderHistory,
      fetchAllMovies,
      fetchedMovies,
    } = this.props;

    //loading only when orderHistory is empty
    if (isAuthenticated && orderHistory.length === 0) {
      fetchOrderHistory(userId);
    }

    if (_.isEmpty(fetchedMovies)) {
      const { movies } = DB;
      fetchAllMovies(movies);
    }
  }
  render() {
    const { historyIsLoading, orderHistory } = this.props;

    return (
      <>
        <div className='OrderHistoryPage'>
          <h1>Your Tickets</h1>
          {/* spinner when history loading */}
          {historyIsLoading && <SpinnerDots />}
          {/* when history fetched, show OrderList */}
          {orderHistory.length > 0 ? (
            <OrderList />
          ) : (
            !historyIsLoading && (
              <div className='OrderHistoryPage__noRecords'>
                You don't have any history at the moment
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, orderHistory, movies }) => ({
  userId: auth.currentUser?.id,
  isAuthenticated: auth.isAuthenticated,
  historyIsLoading: orderHistory.loading,
  orderHistory: orderHistory.orderHistory,
  fetchedMovies: movies.fetchedMovies,
});

export default connect(mapStateToProps, { fetchOrderHistory, fetchAllMovies })(
  OrderHistoryPage
);
