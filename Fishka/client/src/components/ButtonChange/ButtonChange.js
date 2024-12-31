import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonChange.scss'; 

const ButtonChange = ({ text, onClick, typeB }) => {
    let type;

    if(!typeB){
        const addApplyReserveTour = ['add', 'apply', 'reserve', 'tour'];
        const refuseChangeResetEnterprisesNow = ['refuse', 'change', 'reset', 'enterprises', 'now'];
        
        if (addApplyReserveTour.includes(text)) {
            type = 'yellow';
        } else{
            if (refuseChangeResetEnterprisesNow.includes(text)) {
                type = 'red';
            } else {
                type = 'blue';
            }
        }
    }else{
        type = 'transparent';   
    }
    
    return (
        <> 
            <button className={`button_change ${type}`}>
                <p className='text_mln_f18_l18' onClick={onClick}>{text}</p>
            </button>
        </>
    );
};

export default ButtonChange;