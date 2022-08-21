import React, {  useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// Actions 
import { removeAlert } from '../../../actions/alertActions';

import Notification from './Notification';


const AlertContainer = ({ alerts, removeAlert }) => {

    let alertList;

    if(alerts !== null && alerts.length > 0) {
        alertList = alerts.map(alert => <Notification alert={alert} removeAlert={removeAlert} />)  
                    
    }


    return (
        <div className="alert-popup-container">
            {alertList}
        </div> 
        
    )
}

AlertContainer.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(AlertContainer)
