import React, { useEffect } from 'react';
import './Modal.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/slices/modalSlice';

const Modal = () => {
    const dispatch = useDispatch();

    const { isOpen, headerText, modalContent  } = useSelector((state) => state.modal);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => dispatch(closeModal())}>×</button>
                <p className="text_mln_f26_l26">{headerText}</p>
                {modalContent}
            </div>
        </div>
    );
};

export default Modal;   