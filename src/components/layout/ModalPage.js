import React, { Children } from 'react';

import Modal from '../modal/Modal';

const ModalPage = ({ children }) => {
    return (
        <div className="modal__page">
            <div className="modal__container">
                <Modal show>
                    {children}
                </Modal>
            </div>
        </div>
    )
}

export default ModalPage
