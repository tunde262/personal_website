import React from 'react';

const CommentModal = ({ children, shareGroup }) => {
    return (
        <div className={`comment-modal ${shareGroup ? 'shareModal' : ''}`}>
            {children}
        </div>
    )
}

export default CommentModal;
