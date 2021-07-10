import React from 'react';
import ShowTimesDay from './ShowTimesDay/ShowTimesDay';
import './ShowTimesList.scss';

const ShowTimesList = () => {
  return (
    <div className='ShowTimesList'>
      <div className='ShowTimesList__header'>
        <span>9-11</span>
        <span>11-13</span>
        <span>13-15</span>
        <span>15-17</span>
        <span>17-19</span>
        <span>19-21</span>
        <span>21-23</span>
      </div>
      <div className='ShowTimesList__days'>
        <ShowTimesDay day='Mon' />
        <ShowTimesDay day='Tue' />
        <ShowTimesDay day='Wed' />
        <ShowTimesDay day='Thu' />
        <ShowTimesDay day='Fri' />
        <ShowTimesDay day='Sat' />
        <ShowTimesDay day='Sun' />
      </div>
    </div>
  );
};

export default ShowTimesList;
