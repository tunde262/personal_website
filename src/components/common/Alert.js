import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({ alerts }) => {

    let alertList;

    if(alerts !== null && alerts.length > 0) {
        alertList = alerts.map(alert => (
            <div className="alert alert-danger" role="alert">
                { alert.msg }
            </div>
        ))  
                    
    }



    return (
        <div className="alert-container">
            {alertList}
        </div>
        
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert);
