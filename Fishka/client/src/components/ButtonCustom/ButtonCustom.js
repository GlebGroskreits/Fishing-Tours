import React, { useEffect } from 'react';
import './ButtonCustom.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { createTour } from '../../store/slices/tourSlice';
import { closeModal, setResultContent } from '../../store/slices/modalSlice';

const ButtonCustom = ({ text, onClickAction }) => {
    const dispatch = useDispatch();

    const resultContent = useSelector((state) => state.modal.resultContent)

    const handleAction = () => {
        if (text === 'discard') {
            dispatch(setResultContent(null));
            dispatch(closeModal());
        } else {
           onClickAction(resultContent);
           dispatch(closeModal());
        }
    };

    return (
        <button className='button_more' onClick={handleAction}>
            <p className='text_mln_f16_l16'>{text}</p>
        </button>
    );
};

export default ButtonCustom;