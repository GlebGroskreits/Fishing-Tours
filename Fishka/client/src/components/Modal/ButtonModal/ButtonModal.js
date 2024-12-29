import React, { useEffect } from 'react';
import './ButtonModal.scss'; 
import ButtonCustom from '../../ButtonCustom/ButtonCustom';
import { useSelector } from 'react-redux';

const ButtonModal = ({text1, text2, onClick}) => {

    return (
        <div className="button_container">
            <ButtonCustom text={text1} />
            <ButtonCustom text={text2} onClickAction={onClick}  />
        </div>
    );
};

export default ButtonModal;   