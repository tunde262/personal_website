import React, { Fragment } from 'react'

const ModalContainer = ({ editProfile, show, onClose, children, white }) => {
    return (
        <Fragment>
            {show && (
                <div className={`modal-container ${editProfile && 'editProfile'}`}>
                    <div className={`overlay ${white && 'white'}`} onClick={onClose} />
                    {children}
                </div>
            )}
        </Fragment>
    )
}

export default ModalContainer;
