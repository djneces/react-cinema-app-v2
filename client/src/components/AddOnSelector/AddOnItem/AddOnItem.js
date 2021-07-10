import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomBtnFull from '../../CustomBtnFull/CustomBtnFull';
import ItemSizeSelector from './ItemSizeSelector/ItemSizeSelector';
import './AddOnItem.scss';

const AddOnItem = ({ image, alt, addOns }) => {
  const [clicked, setClicked] = useState(false);

  const numberOfItems = Object.values(addOns)
    .filter((item) => item.item === alt)
    .map((item) => item.quantity)
    .reduce((acc, item) => item + acc, 0);

  return (
    <div className='AddOnItem' onMouseLeave={() => setClicked(false)}>
      <img src={image} alt={alt} />
      {!clicked && (
        <div className='AddOnItem__selectBtn'>
          <CustomBtnFull
            height='h10'
            color='light'
            onclick={() => setClicked(true)}
          >
            {numberOfItems
              ? `Selected: ${numberOfItems} item${numberOfItems > 1 ? 's' : ''}`
              : 'Select'}
          </CustomBtnFull>
        </div>
      )}
      {clicked && (
        <div className='AddOnItem__overlay'>
          <h3>Choose the size</h3>
          <small>{alt}</small>
          <div className='AddOnItem__overlay-sizes'>
            <ItemSizeSelector
              size='xl'
              item={alt}
              price={alt === 'coffee' ? 10 : alt === 'coke' ? 8 : 12}
            />
            <ItemSizeSelector
              size='md'
              item={alt}
              price={alt === 'coffee' ? 8 : alt === 'coke' ? 6 : 10}
            />
            <ItemSizeSelector
              size='sm'
              item={alt}
              price={alt === 'coffee' ? 6 : alt === 'coke' ? 5 : 8}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ addOns }) => ({
  addOns: addOns.addOns,
});

export default connect(mapStateToProps)(AddOnItem);
