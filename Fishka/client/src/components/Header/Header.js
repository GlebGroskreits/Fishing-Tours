import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setBurgerOpen } from '../../store/slices/settingSlice';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Instagram, Telegram, VK, Gmail} from '../../utils/icons';

const link = [
    {
        link: '/about',
        name: 'about',
    },
    {
        link: '/tour',
        name: 'tour',
    },
    {
        link: '/tourVIP',
        name: 'VIP',
    },
    {
        link: '/review',
        name: 'review',
    },
    {
        link: '/authorization',
        name: 'registration',
    },
]

const social = [
    VK,Telegram,Instagram,Gmail
]

const Header = () => {
    const dispatch = useDispatch();

    const {isBurgerOpen} = useSelector((state) => state.setting)

    const openBurgerMenu = (open) =>{
        dispatch(setBurgerOpen(open))
        console.log(isBurgerOpen)
        
    }

    return(
        <header>
            <Link to="/about" className="text_mnt_f26_l26">Fishka</Link>
            <nav>
                {link.map((link, index) => (
                    <Link to={link.link} className="text_mln_f22_l22" key={index}>{link.name}</Link>
                ))}
            </nav>
            <div className="icon_link">
                {social.map((social, index) => (
                        <img src={social} alt="soc" key={index} />
                ))}
            </div>
            <button className="burger_menu" onClick={() => openBurgerMenu(!isBurgerOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <BurgerMenu />
        </header>
    )
}

export default Header;