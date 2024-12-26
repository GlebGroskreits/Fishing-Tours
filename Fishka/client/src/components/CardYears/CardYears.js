import React from 'react';
import './CardYears.scss'; 

const CardYears = ({textUp, textLow}) => {
    return (
        <div className="card_years">
            <p className="text_mln_f20_l22">{textUp}</p>
            <p className="text_mln_f18_l26">{textLow}</p>
        </div>
    );
};

export default CardYears;