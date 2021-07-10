import React from 'react';
import './SpinnerDots.scss';

const SpinnerDots = () => {
  return (
    <div className='SpinnerDots lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SpinnerDots;
