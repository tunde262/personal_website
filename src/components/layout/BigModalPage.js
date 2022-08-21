import React, { Children } from 'react';

import BigModal from '../modal/BigModal';

const ModalPage = ({ children }) => {
    return (
        <div className="modal__page">
            <div className="modal__container">
                <BigModal show>
                    {children}
                </BigModal>
            </div>
        </div>
    )
}

export default ModalPage
