import React from 'react';
import StripeBtn from '../StripeBtn/StripeBtn';
import moment from 'moment';
import './OutstandingInvoice.scss';

const OutstandingInvoice = ({
  ticketId,
  createdAt,
  total,
  userId,
  orderId,
  orderHistory,
}) => {
  return (
    <div className='OutstandingInvoice'>
      <span>
        <i className='fas fa-times'></i>
      </span>
      <span>{ticketId}</span>
      <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
      <span>$ {total.toFixed(2)}</span>
      <div className={`OutstandingInvoice__stripe`}>
        <StripeBtn
          price={total}
          userId={userId}
          orderId={orderId}
          orderHistory={orderHistory}
        />
      </div>
    </div>
  );
};

export default OutstandingInvoice;
