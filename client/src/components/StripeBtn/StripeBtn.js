import React from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/images/logoSM.png';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { processPayment } from '../../store/actions/payment';

const StripeBtn = ({ price, processPayment, userId, orderId, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  const onToken = (token) => {
    processPayment(priceForStripe, token, userId, orderId, history);
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Cinemax'
      billingAddress
      shippingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel={`Pay Now`}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapStateToProps = ({ orderHistory }) => ({
  orderHistory: orderHistory.orderHistory,
});

export default withRouter(
  connect(mapStateToProps, { processPayment })(StripeBtn)
);
