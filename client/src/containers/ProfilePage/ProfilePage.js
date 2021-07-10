import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchOrderHistory } from '../../store/actions/orderHistory';
import './ProfilePage.scss';

const ProfilePage = ({
  currentUser,
  isAuthenticated,
  orderHistory,
  fetchOrderHistory,
}) => {
  useEffect(() => {
    //loading only when orderHistory is empty
    if (isAuthenticated && orderHistory.length === 0) {
      fetchOrderHistory(currentUser.id);
    }
  });
  return (
    <div className='ProfilePage'>
      {isAuthenticated ? (
        <>
          <h2>Your Profile</h2>
          <div className='ProfilePage__summary'>
            <div>
              <span>Client card #</span>
              <span>{currentUser && currentUser.id}</span>
            </div>
            <div>
              <span>Your name</span>
              <span>{currentUser && currentUser.username}</span>
            </div>
            <div>
              <span>Your email</span>
              <span>{currentUser && currentUser.email}</span>
            </div>
            <div>
              <span># of orders</span>
              <span>{orderHistory.length}</span>
            </div>
            <div>
              <span>Last order</span>
              <span>
                {orderHistory.length > 0 &&
                  moment(orderHistory[0].createdAt).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className='ProfilePage__summary'>Please login first</div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, orderHistory }) => ({
  currentUser: auth.currentUser,
  isAuthenticated: auth.isAuthenticated,
  orderHistory: orderHistory.orderHistory,
});

export default connect(mapStateToProps, { fetchOrderHistory })(ProfilePage);
