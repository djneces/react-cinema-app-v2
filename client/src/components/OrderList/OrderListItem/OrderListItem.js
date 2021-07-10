import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  renderAddOnType,
  isSelected,
  isAddOnsEmpty,
} from '../../AddOnsSummary/AddOnsUtil';

import './OrderListItem.scss';

const OrderListItem = ({
  selectedMovie,
  selectedMovieTime,
  selectedSeats,
  fetchedMovies,
  ticketId,
  createdAt,
  movieOnSelectHall,
  addOns,
  paid,
}) => {
  const [clicked, setClicked] = useState(false);

  const renderMultipleTickets = () => {
    //if selected seats undefined
    if (!selectedSeats || !selectedMovie || !selectedMovieTime)
      return (
        <div className='OrderListItem' style={{ color: 'red' }}>
          Data missing
        </div>
      );
    return selectedSeats.map((ticket, i) => {
      return (
        <div className={`OrderListItem ${clicked ? 'noHover' : ''}`} key={i}>
          <div className='OrderListItem__leftSide'>
            <div className='OrderListItem__leftSide-title'>
              {fetchedMovies[selectedMovie].title}
            </div>
            <div className='OrderListItem__leftSide-time'>
              {selectedMovieTime}
            </div>
            <div className='OrderListItem__leftSide-footer'>
              <div className='OrderListItem__leftSide-footer-seat'>
                <div>
                  <span>HALL</span>
                  <span>{movieOnSelectHall}</span>
                </div>
                <div>
                  <span>ROW</span>
                  <span>{ticket.row}</span>
                </div>
                <div>
                  <span>SEAT</span>
                  <span>{ticket.seat}</span>
                </div>
              </div>
              <div className='OrderListItem__leftSide-footer-id'>
                {ticketId}
              </div>
            </div>
          </div>
          <div className='OrderListItem__rightSide'>
            <div className='OrderListItem__rightSide-title'>
              {fetchedMovies[selectedMovie].title}
            </div>
            <div className='OrderListItem__rightSide-time'>
              {selectedMovieTime}
            </div>
            <div className='OrderListItem__rightSide-footer'>
              <div className='OrderListItem__rightSide-footer-seat'>
                <div>
                  <span>HALL</span>
                  <span>{movieOnSelectHall}</span>
                </div>
                <div>
                  <span>ROW</span>
                  <span>{ticket.row}</span>
                </div>
                <div>
                  <span>SEAT</span>
                  <span>{ticket.seat}</span>
                </div>
              </div>
              <div className='OrderListItem__rightSide-footer-price'>
                <span>$</span> 15
              </div>
            </div>
          </div>
          <div className='OrderListItem__divider'></div>
          <div className='OrderListItem__print' onClick={clickOnPrint}>
            <i className='fas fa-print'></i>
            <small>Print</small>
          </div>
        </div>
      );
    });
  };

  const renderAddOns = () => {
    return (
      <div className='OrderListItem__wrapper-addons'>
        {!isAddOnsEmpty(addOns) ? (
          <>
            <h3>Your AddOns</h3>
            <div className='OrderListItem__wrapper-addons-items'>
              {isSelected('coffee', addOns) && (
                <div className='OrderListItem__wrapper-addons-items--item'>
                  <h4>Coffee</h4>
                  {renderAddOnType('coffee', addOns)}
                </div>
              )}

              {isSelected('coke', addOns) && (
                <div className='OrderListItem__wrapper-addons-items--item'>
                  <h4>Coke</h4>
                  {renderAddOnType('coke', addOns)}
                </div>
              )}
              {isSelected('popcorn', addOns) && (
                <div className='OrderListItem__wrapper-addons-items--item'>
                  <h4>Popcorn</h4>
                  {renderAddOnType('popcorn', addOns)}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    );
  };

  //prints the ticket
  const printListItem = (itemToPrintId) => {
    let printElement = document.getElementById(itemToPrintId);
    const printWindow = window.open('', 'PRINT');
    printWindow.document.write(document.documentElement.innerHTML);
    setTimeout(() => {
      // Needed for large documents
      printWindow.document.body.style.margin = '0 0 auto 0';
      printWindow.document.body.style.justifyContent = 'flex-start';
      printWindow.document.body.innerHTML = printElement.outerHTML;
      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/
      printWindow.print();
      printWindow.close();
      //enable hover effect on main div showing printing icon again
      setClicked(false);
    }, 1000);
  };

  //hides via class noHover on main div the print icon when clicking on print icon (doesn't appear on print)
  const clickOnPrint = () => {
    setClicked(true);
    printListItem(`${ticketId}`);
  };

  const renderListItem = () => {
    if (_.isEmpty(fetchedMovies)) {
      return null;
    } else {
      return (
        <div className='OrderListItem__wrapper' id={`${ticketId}`}>
          <div className='OrderListItem__createdAt'>
            <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <span>{moment(createdAt).startOf().fromNow()}</span>
          </div>
          <div
            className={`OrderListItem__wrapper-paymentStatus ${
              !paid ? 'notPaid' : ''
            } ${clicked ? 'invisible' : ''}`}
          >
            {paid ? (
              'paid'
            ) : (
              <>
                <span>not paid</span>
                <Link to='/payment'>
                  {' '}
                  <i className='fas fa-credit-card'></i>
                </Link>
              </>
            )}
          </div>
          {renderMultipleTickets()}
          {renderAddOns()}
        </div>
      );
    }
  };

  return renderListItem();
};

const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies.fetchedMovies,
});

export default connect(mapStateToProps)(OrderListItem);
