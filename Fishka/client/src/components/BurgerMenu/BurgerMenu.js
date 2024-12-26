import React from 'react';
import './BurgerMenu.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { About, Review, Tour, Vip, Workspace } from '../../utils/icons';

const link = [
    {
        icon: About,
        link: '/about',
        name: 'about',
    },
    {
        icon: Tour,
        link: '/tour',
        name: 'tour',
    },
    {
        icon: Vip,
        link: '/tourVIP',
        name: 'VIP',
    },
    {
        icon: Review,
        link: '/review',
        name: 'review',
    },
    {
        icon: Workspace,
        link: '/workspace',
        name: 'workspace',
    },
]

const BurgerMenu = () => {
    const {isBurgerOpen} = useSelector((state) => state.setting)

    return(
       <div className={`b_menu ${!isBurgerOpen ? 'show' : 'hide'}`}>
        {link.map((link, index) => (
            <Link to={link.link} key={index}>
                <img src={link.icon} alt="p" />
                <p className="text_mln_f22_l22" >{link.name}</p>
            </Link>
        ))}
       </div>
    )
}

export default BurgerMenu;