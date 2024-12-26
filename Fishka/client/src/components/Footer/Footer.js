import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss'; 
import { BGmail, BInstagram, BTelegram, BTwitter, BVk, FAddress, FArrow, FTelephone } from '../../utils/icons';

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
]

const socials = [
    {
        icon: BInstagram,
        text: '/main',
    },
    {
        icon: BVk,
        text: '/main',
    },
    {
        icon: BGmail,
        text: '/main',
    },
    {
        icon: BTwitter,
        text: '/main',
    },
    {
        icon: BTelegram,
        text: '/main',
    },
]

const Footer = () => {
    return (
        <footer>
            <div className="footer_up">
                <div className="footer_box">
                    <p className="text_mnt_f26_l26">Fishka</p>
                    <nav>
                        {link.map((link, index) => (
                            <Link to={link.link} className="text_mln_f22_l22" key={index}>{link.name}</Link>
                        ))}
                    </nav>
                    <p className="text_mnt_f26_l26">Contact</p>
                    <div className="footer_contact">
                        <img src={FAddress} alt="add" />
                        <p className="text_mln_f22_l22">Mogilev, Mira Avenue, 43</p>
                    </div>
                    <div className="footer_contact">
                        <img src={FTelephone} alt="tel" />
                        <p className="text_mln_f22_l22">+375 (222) 244-777</p>
                    </div>
                </div>
                <div className="footer_box">
                    <p className="text_mnt_f26_l26">Support</p>
                    <form action="">
                        <input type="text" placeholder="Your question" />
                        <img src={FArrow} alt="arr" />
                    </form>
                
                    <p className="text_mnt_f26_l26">Follow us</p>
                    <div className="footer_follow">
                        {socials.map((social, index) => (
                            <Link key={index} to={social.link}>
                                <img src={social.icon} alt="soc" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer_low">
                <p className="text_mln_f26_l26">©</p>
                <p className="text_mln_f20_l26">2024 Fishka</p>
            </div>
            
        </footer>
    );
};

export default Footer;