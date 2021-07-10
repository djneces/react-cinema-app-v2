import _ from 'lodash';
export const renderAddOnType = (addOn, addOns) => {
  return Object.values(addOns).map(
    ({ id, item, size, price, quantity }) =>
      item === addOn &&
      quantity > 0 && (
        <div className={`AddOnsSummary__item-${addOn}`} key={id}>
          <span>
            {size === 'xl' ? 'Large' : size === 'md' ? 'Medium' : 'Small'}{' '}
          </span>
          <span>x {quantity}</span>
          <span>{`($${(price * quantity).toFixed(2)})`}</span>
        </div>
      )
  );
};

export const isSelected = (addOn, addOns) => {
  return Object.values(addOns).some(
    (item) => item.item === addOn && item.quantity > 0
  );
};

export const isAddOnsEmpty = (addOns) => {
  return (
    _.isEmpty(addOns) ||
    Object.values(addOns).every((item) => item.quantity === 0)
  );
};

export const calculateTotal = (addOns, selectedSeats, TICKET_PRICE) => {
  const addOnsTotal = Object.values(addOns)
    .map((item) => item.price * item.quantity)
    .reduce((acc, item) => acc + item, 0);
  const ticketsTotal = selectedSeats.length * TICKET_PRICE;
  return addOnsTotal + ticketsTotal;
};
