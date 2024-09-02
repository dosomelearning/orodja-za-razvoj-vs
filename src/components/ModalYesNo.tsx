// src/components/Modal.tsx

import React from 'react';
import './ModalYesNo.css';

interface ModalProps {
    question: string;
    onClose: (answer: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ question, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{question}</p>
                <div className="modal-buttons">
                    <button onClick={() => onClose(true)}>Yes</button>
                    <button onClick={() => onClose(false)}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
