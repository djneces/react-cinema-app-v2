import React from 'react';
import './CustomBtnFull.scss';

const CustomBtnFull = ({
  children,
  onclick,
  width,
  height,
  color,
  disabled,
}) => {
  return (
    <div
      className={`CustomBtnFull ${width === 'w30' ? 'w-30' : ''} ${
        height === 'h10' ? 'h-10' : ''
      } ${color === 'light' ? 'primaryLight' : ''}
      ${disabled ? 'disabled' : ''}`}
      onClick={onclick}
    >
      <div>{children}</div>
    </div>
  );
};

export default CustomBtnFull;
