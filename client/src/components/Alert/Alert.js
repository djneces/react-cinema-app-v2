import React from 'react';
import { connect } from 'react-redux';
import './Alert.scss';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`Alert ${alert.alertType}`}>
      <i className='fas fa-check-circle'></i>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
