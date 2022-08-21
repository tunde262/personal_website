import React, {  useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const Notification = ({ alert, removeAlert }) => {
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    const [showAlert, setShowAlert] = useState(true);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if(prev < 100) {

                    return prev + 0.5;
                }

                return prev;

            })
        }, 12);

        setIntervalID(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalID)
    };

    useEffect(() => {
        handleStartTimer();
    }, [])

    return (
        <div 
            // onMouseEnter={handlePauseTimer} 
            // onMouseLeave={handleStartTimer} 
            className={
                `alert-popup showAlert show 
                ${alert.alertType === 'success' && 'success'}
                ${alert.alertType === 'okay' && 'okay'}
                ${alert.alertType === 'danger' && 'danger'}`
            }
        >
            <span className="msg">{ alert.msg }</span>
            {/* <div className="close-btn">
                <span className="fas fa-times"></span>
            </div> */}
            <div className="alert-popup__bar" style={{width: `${width}%`}} />
        </div>
        
    )
}

Notification.propTypes = {

}

export default Notification;
