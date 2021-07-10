import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../../assets/images/cinema-bg.jpg';
import CustomBtnFull from '../../components/CustomBtnFull/CustomBtnFull';
import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <img src={bgImg} alt='main page background' />
      <div className='LandingPage__hero'>
        <div className='LandingPage__hero-heading'>
          <h1>MOVIES</h1>
          <Link to='/movies'>
            <CustomBtnFull width={'w30'}>Buy tickets</CustomBtnFull>
          </Link>
        </div>
        <div className='LandingPage__hero-subheading'>
          <h2>
            ultimate <span>5D</span> experience
          </h2>
        </div>
        <div className='LandingPage__footer'>
          <small>
            "Sit back and immerse yourself in this spectacular world"
          </small>
          <div className='LandingPage__footer-socialMedia'>
            <span>
              <i className='fab fa-facebook'></i>
            </span>
            <span>
              <i className='fab fa-twitter'></i>
            </span>
            <span>
              <i className='fab fa-youtube'></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
