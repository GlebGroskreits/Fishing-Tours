import React, { useEffect, useState } from 'react';
import './About.scss';
import { AboutBC } from "../../utils/images";
import { CardYears, HeaderSection, MapClick, GuideSection, Loading   } from "../../utils/components";
import { useDispatch, useSelector } from 'react-redux';
import { getGuide } from '../../store/slices/guideSlice';

const About = () => {
    const dispatch = useDispatch();
    
    const [cards, setCards] = useState([]);
    const [selectIndex, setIndex] = useState(0);
    const [selectYear, setSelectYear] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            
            fetch('./data/year.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сетевая ошибка');
                }
                return response.json();
            })
            .then(data => {
                setCards(data.cards);
                // Устанавливаем первый элемент в selectYear, если cards не пустой
                if (data.cards.length > 0) {
                    setSelectYear(data.cards[0].items);
                }
            })
            .catch(error => console.error('Произошла проблема с операцией fetch:', error));

            dispatch(getGuide());
            setLoading(false);
        }, 1000); 
    
        return () => clearTimeout(timer);
    }, [dispatch]);

    const setIndexValue = (index) => {
        setIndex(index)
        setSelectYear(cards[index].items)
    }

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
            <>
                <section className="main_image fade_in">
                    <img src={AboutBC} alt="bcMain" className="responsive_image fade_in"/>
                    <p className="text_mnt_f46_l50 tabout">We respect both our customers and nature</p>
                    <p className="text_mln_f26_l26">ensuring safety, passion for fishing</p>
                </section>
                <section className="main_years fade_in">
                    <HeaderSection textUp={"Timeline"} textLow={"major events"} />
                    <div className="main_years_card">
                        {selectYear.map((year, index) => (
                            <CardYears key={index} textUp={year.textUp} textLow={year.textLow}/>
                        ))}
                    </div>
                    <div className="years_paggination fade_in">
                        {cards.map((card, index) => (
                            <div className="yp" key={index} onClick={() => setIndexValue(index)}>
                                <p className="text_mln_f18_l18">{card.year}</p>
                                <span className={`${selectIndex == index ? 'dot active' : 'dot'}`}></span>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="main_map fade_in">
                   <MapClick />
                </section>
                <GuideSection />
            </>
                   )}
        </> 
    );
}

export default About;