import React from 'react';
import coffee from '../../assets/images/coffee.jpg';
import coke from '../../assets/images/coke.jpg';
import popcorn from '../../assets/images/popcorn.jpg';
import AddOnItem from './AddOnItem/AddOnItem';
import './AddOnSelector.scss';

const AddOnSelector = () => {
  return (
    <div className='AddOnSelector'>
      <AddOnItem image={coffee} alt='coffee' />
      <AddOnItem image={coke} alt='coke' />
      <AddOnItem image={popcorn} alt='popcorn' />
    </div>
  );
};

export default AddOnSelector;
