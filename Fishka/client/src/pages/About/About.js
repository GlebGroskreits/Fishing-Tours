import React from "react";
import './About.scss';
import { AboutBC } from "../../utils/images";

const About = () => {
    return (
       <>
            <section className="main_image">
                <img src={AboutBC} alt="bcMain" className="responsive_image"/>
                <p className="text_mnt_f46_l50">We respect both our customers and nature</p>
                <p className="text_mln_f26_l26">ensuring safety, passion for fishing</p>
            </section>
       </>
    );
}

export default About;