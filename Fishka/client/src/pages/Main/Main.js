import React, {useState, useEffect} from "react";
import './Main.scss';
import { ButtonLink, CardMainSection, HeaderSection, LinkSection, Loading } from "../../utils/components";
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
        header: 'Bliss at Dusk',
        underHeader: 'a moment of reflection',
        textUp: 'On the dock, bathed in the soft light of sunset, a fisherman with a rod savors the moment.',
        textLow: 'The still water and picturesque landscape provide perfect conditions for fishing and relaxation, allowing him to forget the hustle of everyday life.'
    },
    {
        image: Politics3,
        header: 'Evening Fishing',
        underHeader: 'embracing Nature is beauty',
        textUp: 'A fisherman at sunset, standing on the dock, casts his line while enjoying the peace and beauty of nature.',
        textLow: 'The rod in his hands and the warm hues of the sunset create a serene atmosphere, ideal for an engaging fishing experience.'
    },
    {
        image: Politics4,
        header: 'Fishing at Sunset',
        underHeader: 'a perfect evening on the dock',
        textUp: 'Against the stunning backdrop of a sunset, a fisherman stands on the dock with a fishing rod in hand.',
        textLow: 'The calm water reflects the vibrant colors of the sky, creating an atmosphere of tranquility. This moment is perfect for fishing, where nature and soul unite.'
    },
]

const pageLink = {
    link: '/about',
    header: 'More about us',
    page: 'about',
}

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

    const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000); 
        
            return () => clearTimeout(timer);
        }, []);

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
           
        <>
            <section className="main_image">
                <img src={MainBC} alt="bcMain" className="responsive_image fade_in"/>
                <p className="text_mnt_f46_l60 tmain">The perfect fishing vacation starts here!</p>
                <div className="button_links fade_in">
                    <ButtonLink text={'Tours'} link={"/tour"}/>
                    <ButtonLink text={'VIP tours'} link={"/tourVIP"}/>
                </div>
            </section>
            <section className="main_card fade_in">
                {cards.map((card, index) => (
                    <CardMainSection key={index} icon={card.icon} textUp={card.textUp} textLow={card.textLow}/>
                ))}
            </section>
            <section className="main_politics fade_in">
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
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link}/>
        </>
        )}
        </>
    );
}

export default Main;