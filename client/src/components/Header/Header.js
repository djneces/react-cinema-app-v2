import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { toggleAccountDetails } from '../../store/actions/accountDetailsMenu';
import AccountDetailsMenu from '../AccountDetailsMenu/AccountDetailsMenu';
import logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = ({ toggle, isAuthenticated, toggleAccountDetails }) => {
  const toggleDetails = () => {
    if (toggle) {
      toggleAccountDetails();
    }
  };
  return (
    <div className='Header' onMouseLeave={toggleDetails}>
      <div className='Header__logo'>
        <Link to='/'>
          <img src={logo} alt='website logo icon' />
        </Link>
      </div>
      <div className='Header__account'>
        <div className='Header__googleLogin'>
          <GoogleAuth />
        </div>
        {toggle && isAuthenticated && <AccountDetailsMenu />}
      </div>
    </div>
  );
};

const mapStateToProps = ({ toggleMenu, auth }) => ({
  toggle: toggleMenu,
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, { toggleAccountDetails })(Header);
