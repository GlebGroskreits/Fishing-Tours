import React from 'react';
import './CardMainSection.scss'; 

const CardMainSection = ({icon, textUp, textLow}) => {
    return (
        <div className="card_main_section">
            <img src={icon} alt="icon" />
            <p className="text_mln_f20_l22">{textUp}</p>
            <p className="text_mln_f18_l26">{textLow}</p>
        </div>
    );
};

export default CardMainSection;