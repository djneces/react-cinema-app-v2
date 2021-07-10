import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import LandingPage from './containers/LandingPage/LandingPage';
import SelectMoviePage from './containers/SelectMoviePage/SelectMoviePage';
import SelectShowTimePage from './containers/SelectShowTimePage/SelectShowTimePage';
import ShowMovieDetailsPage from './containers/ShowMovieDetailsPage/ShowMovieDetailsPage';
import SelectSeatPage from './containers/SelectSeatPage/SelectSeatPage';
import OrderHistoryPage from './containers/OrderHistoryPage/OrderHistoryPage';
import AddOnsPage from './containers/AddOnsPage/AddOnsPage';
import PaymentPage from './containers/PaymentPage/PaymentPage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import Alert from './components/Alert/Alert';
import './App.scss';

const App = ({
  selectedMovie,
  selectedMovieTime,
  selectedSeats,
  isAuthenticated,
}) => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Alert />
        <Header />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/movies' component={SelectMoviePage} />
          <Route exact path='/movies/:movie' component={ShowMovieDetailsPage} />
          {/* render /times only when a movie selected */}
          <Route
            exact
            path='/times'
            render={() =>
              selectedMovie ? <SelectShowTimePage /> : <Redirect to='/movies' />
            }
          />
          {/* render /movies only when a movie and a time selected */}
          <Route
            exact
            path='/seats'
            render={() =>
              selectedMovie && selectedMovieTime ? (
                <SelectSeatPage />
              ) : (
                <Redirect to='/movies' />
              )
            }
          />
          {/* render /addons only when a movie, a time and a seat selected */}
          <Route
            exact
            path='/addons'
            render={() =>
              selectedMovie && selectedMovieTime && selectedSeats.length > 0 ? (
                <AddOnsPage />
              ) : (
                <Redirect to='/movies' />
              )
            }
          />
          {/* render /tickets only when authenticated */}
          <Route
            exact
            path='/tickets'
            render={() =>
              isAuthenticated ? <OrderHistoryPage /> : <Redirect to='/' />
            }
          />
          {/* render /payment only when authenticated */}
          <Route
            exact
            path='/payment'
            render={() =>
              isAuthenticated ? <PaymentPage /> : <Redirect to='/' />
            }
          />
          {/* render /profile only when authenticated */}
          <Route
            exact
            path='/profile'
            render={() =>
              isAuthenticated ? <ProfilePage /> : <Redirect to='/' />
            }
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ movies, seats, auth }) => ({
  selectedMovie: movies.selectedMovie,
  selectedMovieTime: movies.selectedMovieTime,
  selectedSeats: seats.selectedSeats,
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
