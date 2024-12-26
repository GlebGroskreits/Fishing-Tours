import React from 'react';
import './HeaderSection.scss'; 

const HeaderSection = ({textUp, textLow}) => {
    return (
        <div className="header_section">
            <div className="hs_text">
                <p className="text_mnt_f36_l36">{textUp}</p>
                <p className="text_mln_f22_l22">{textLow}</p>
            </div>
            <div className="hs_line"></div>
        </div>
    );
};

export default HeaderSection;