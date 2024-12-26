import React from "react";
import './Main.scss';
import { ButtonLink } from "../../utils/components";
import { MainBC } from "../../utils/images";

const Main = () => {
    return (
        <div className="mains">
            <section className="main_image">
                <img src={MainBC} alt="bcMain" className="responsive_image"/>
                <p className="text_mnt_f46_l60">The perfect fishing vacation starts here!</p>
                <div className="button_links">
                    <ButtonLink text={'Tours'} link={"/tour"}/>
                    <ButtonLink text={'VIP tours'} link={"/tourVIP"}/>
                </div>
            </section>
        </div>
    );
}

export default Main;