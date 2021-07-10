import React from 'react';
import './CustomBtnOutline.scss';

const CustomBtnOutline = ({ onclick, children }) => {
  return (
    <div className='CustomBtnOutline' onClick={onclick}>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
      <span>
        <span>{children}</span>
      </span>
    </div>
  );
};

export default CustomBtnOutline;
