import React from 'react';
import './LinkSection.scss'; 
import {ButtonLinkCircle, ButtonLink} from '../../utils/components'
import { BInstagram, BTelegram, BVk } from '../../utils/icons';

const socials = [
    {
        icon: BInstagram,
        link: '',
    },
    {
        icon: BTelegram,
        link: '',
    },
    {
        icon: BVk,
        link: '',
    },
]

const LinkSection = ({ text, page, link }) => {
    return (
        <section className="link_section">
            <p className="text_mnt_f36_l36">More about us</p>
            <div className="link_select">
                <ButtonLink text={page} link={link}/>
                <p className="text_mnt_f26_l26">or</p>
                <div>
                    {socials.map((social, index) => (
                        <ButtonLinkCircle key={index} link={social.link} icon={social.icon}/>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default LinkSection;