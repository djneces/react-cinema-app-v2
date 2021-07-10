import React from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ShowTimesList from '../../components/ShowTimesList/ShowTimesList';
import './SelectShowTimePage.scss';

const SelectShowTimePage = () => {
  return (
    <div className='SelectShowTimePage'>
      <div className='SelectShowTimePage__showTimesList'>
        <ShowTimesList />
      </div>
      <div className='SelectShowTimePage__orderSummary'>
        <OrderSummary />
      </div>
    </div>
  );
};

export default SelectShowTimePage;
