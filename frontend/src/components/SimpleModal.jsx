import React from 'react';
import './styles/SimpleModal.css'; // Assume we have some CSS for the modal

const SimpleModal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modal">
                {children}
                <button onClick={onClose} className="closeButton">&times;</button>

            </div>
        </div>
    );
};

export default SimpleModal;