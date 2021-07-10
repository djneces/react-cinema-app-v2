import React from 'react';
import './ScrollDownArrow.scss';

const ScrollDownArrow = () => {
  return (
    <div className='ScrollDownArrow'>
      <span className='scroll-btn'>
        <div>
          <span className='mouse'>
            <span></span>
          </span>
        </div>
      </span>
    </div>
  );
};

export default ScrollDownArrow;
