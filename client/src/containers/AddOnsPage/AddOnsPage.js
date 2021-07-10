import React from 'react';
import AddOnSelector from '../../components/AddOnSelector/AddOnSelector';
import AddOnsSummary from '../../components/AddOnsSummary/AddOnsSummary';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import './AddOnsPage.scss';

const AddOnsPage = () => {
  return (
    <div className='AddOnsPage'>
      <AddOnSelector />
      <div className='AddOnsPage__summary'>
        <OrderSummary />
        <AddOnsSummary />
      </div>
    </div>
  );
};

export default AddOnsPage;
