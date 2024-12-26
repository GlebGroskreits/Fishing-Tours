import React, {useState} from "react";
import './Main.scss';
import { ButtonLink, CardMainSection, HeaderSection } from "../../utils/components";
import { MainBC, Politics1, Politics2, Politics3, Politics4 } from "../../utils/images";
import { WorkExpirience, ProffesionalGuide, UniqueLocation, Safety } from "../../utils/icons";

const cards =[
    {
        icon: WorkExpirience,
        textUp: 'Work experience',
        textLow:'guarantee your safety while fishing',
    },
    {
        icon: ProffesionalGuide,
        textUp: 'Professional guides',
        textLow:'guarantee your safety while fishing',
    },
    {
        icon: UniqueLocation,
        textUp: 'Unique locations',
        textLow:'guarantee your safety while fishing',
    },
    {
        icon: Safety,
        textUp: 'Safety and reliability',
        textLow:'guarantee your safety while fishing',
    },
]

const politics = [
    {
        image: Politics1,
        header: 'Best equipment',
        underHeader: 'all taste and colors',
        textUp: 'Our arsenal includes high quality rods, lures and accessories from well-known manufacturers.',
        textLow: 'Our guides are always ready to help you choose the right equipment based on the peculiarities of the water body and your preferences.'
    },
    {
        image: Politics2,
        header: 'Best equipment',
        underHeader: 'all taste and colors',
        textUp: 'Our arsenal includes high quality rods, lures and accessories from well-known manufacturers.',
        textLow: 'Our guides are always ready to help you choose the right equipment based on the peculiarities of the water body and your preferences.'
    },
    {
        image: Politics3,
        header: 'Best equipment',
        underHeader: 'all taste and colors',
        textUp: 'Our arsenal includes high quality rods, lures and accessories from well-known manufacturers.',
        textLow: 'Our guides are always ready to help you choose the right equipment based on the peculiarities of the water body and your preferences.'
    },
    {
        image: Politics4,
        header: 'Best equipment',
        underHeader: 'all taste and colors',
        textUp: 'Our arsenal includes high quality rods, lures and accessories from well-known manufacturers.',
        textLow: 'Our guides are always ready to help you choose the right equipment based on the peculiarities of the water body and your preferences.'
    },
]

const Main = () => {

    const [politic, setPolitic] = useState({
        image: politics[0].image,
        header: politics[0].header,
        underHeader: politics[0].underHeader,
        textUp: politics[0].textUp,
        textLow: politics[0].textLow,
    })
    
    const changeSectionPolitic = (index) => {
        setPolitic({
            image: politics[index].image,
            header: politics[index].header,
            underHeader: politics[index].underHeader,
            textUp: politics[index].textUp,
            textLow: politics[index].textLow,
        })
    }

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
            <section className="main_card">
                {cards.map((card, index) => (
                    <CardMainSection key={index} icon={card.icon} textUp={card.textUp} textLow={card.textLow}/>
                ))}
            </section>
            <section className="main_politics">
                <HeaderSection textUp={"Politics"} textLow={"fair and binding principles"} />
                <div className="mp">
                    <img src={politic.image} alt="politic" className="politic_image"/>
                    <div className="politic_text">
                        <p className="text_mnt_f26_l26">{politic.header}</p>
                        <p className="text_mln_f22_l22">{politic.underHeader}</p>
                        <p className="text_mln_f20_l26">{politic.textUp}</p>
                        <p className="text_mln_f20_l26">{politic.textLow}</p>
                    </div>
                    <div className="politic_paggination"> 
                        {politics.map((pol, index) => (
                            <img src={pol.image} alt="pag" key={index} onClick={() => changeSectionPolitic(index)}/>
                        ))}
                    </div>
                </div>   
            </section>
        </div>
    );
}

export default Main;