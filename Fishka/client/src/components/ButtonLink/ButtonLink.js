import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss'; 

const ButtonLink = ({ text, link }) => {
    return (
        <Link to={link} className="button_link">
           <p className="text_mln_f26_l26">{text}</p>
        </Link>
    );
};

export default ButtonLink;