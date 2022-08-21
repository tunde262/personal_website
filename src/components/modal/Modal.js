import React from 'react';

const Modal = ({ children, border }) => {
    return (
        <div className={`modal ${border && 'border'}`}>
            {children}
        </div>
    )
}

export default Modal;
