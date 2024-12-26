import React, { useEffect, useState } from 'react';
import './GuideSection.scss'; 
import { FArrow } from '../../utils/icons';
import { useSelector } from 'react-redux';
import { STATIC_URL } from '../../http';

const GuideSection = () => {

    const [selectIndex, setIndex] = useState(0)
    const [selectGuide, setGuide] = useState({})
    const guide = useSelector((state) => state.guide.guide)

    useEffect(() => {
        if (guide.length > 0) {
            setGuide(guide[0]);
        }
    }, [guide]);

    const paggination = (index) => {
        if(selectIndex + index == guide.length){
            setIndex(0);
        }
        else{
            if(selectIndex + index < 0){
                setIndex(guide.length - 1);
            }
            else{
                setIndex(selectIndex + index);
            }
        }

        setGuide(guide[selectIndex]);    
    }

    return (
        <section className="main_guide">
            <img src={`${STATIC_URL}${selectGuide.image}`} alt="" />
            <div className="guide_text">
                <p className="text_mnt_f26_l26">{selectGuide.name} {selectGuide.surname}</p>
                <p className="text_mln_f22_l22">Seniority: {selectGuide.seniority} years</p>
                <p className="text_mln_f20_l26">{selectGuide.description}</p>
            </div>
            <div className="guide_paggination">
                <img src={FArrow} alt="r" onClick={() => paggination(1)}/>
                <img src={FArrow} alt="l" onClick={() => paggination(-1)}/>
            </div>
        </section>
    );
};

export default GuideSection;