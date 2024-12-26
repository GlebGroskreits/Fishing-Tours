import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLinkCircle.scss'; 

const ButtonLinkCircle = ({ icon, link }) => {
    return (
        <Link to={link} className="button_link_c">
           <img src={icon} alt="soc" />
        </Link>
    );
};

export default ButtonLinkCircle;