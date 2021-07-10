import React from 'react';
import { connect } from 'react-redux';
import { addAddOn, removeAddOn } from '../../../../store/actions/addons';
import './ItemSizeSelector.scss';

const ItemSizeSelector = ({
  size,
  item,
  price,
  addAddOn,
  removeAddOn,
  addOns,
}) => {
  const addOnId = `${item}-${size}`;
  const addOnToAdd = { id: addOnId, item, size, price };
  const addOnClick = () => {
    addAddOn(addOnToAdd);
  };
  const removeOnClick = () => {
    removeAddOn(addOnToAdd);
  };
  return (
    <div className='ItemSizeSelector'>
      <div>
        <div className='ItemSizeSelector__size'>{size}</div>
        <div className='ItemSizeSelector__price'>
          <span>$</span>
          {price}
        </div>
      </div>
      <div className='ItemSizeSelector__quantity'>
        <i className='fas fa-sort-up' onClick={addOnClick}></i>
        {addOns[addOnId] ? addOns[addOnId].quantity : 0}
        <i className='fas fa-sort-down' onClick={removeOnClick}></i>
      </div>
    </div>
  );
};

const mapStateToProps = ({ addOns }) => ({
  addOns: addOns.addOns,
});

export default connect(mapStateToProps, { addAddOn, removeAddOn })(
  ItemSizeSelector
);
