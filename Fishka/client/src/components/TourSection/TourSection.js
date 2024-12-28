import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TourSection.scss'; 
import {ButtonChange, LinkSection, CustomSelect} from '../../utils/components'
import { TourBC } from '../../utils/images';

const pageLink = {
    link: '/review',
    header: 'Leave feedback',
    page: 'review',
}

const option_critetion = [
    'name', 'duration'
]

const option_range = [
   'a - z', 'z - a'
]

const option_change = [
    'tour', 'active tour'
 ]

const TourSection = ({ bcImage }) => {
   
    const role = useSelector((state) => state.auth.user.role);

    const [selectedValue, setSelectedValue] = useState('Выберите вариант');
    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    console.log(selectedValue)

    return (
        <>
            <section className="bc_image">
                <img src={bcImage.image} alt="bcTour" className="responsive_image"/>
                <p className={`text_mnt_f46_l50 ${bcImage.image == TourBC ? 'tour' : 'viptour'}`}>{bcImage.textUp}</p>
                <p className="text_mln_f26_l26">{bcImage.textLow}</p>
            </section>
            <section className="tour_filter">
                <div className='tf_box'>
                    <div className='tfb_name'>
                        <p className='text_mnt_f26_l26'>Filter</p>
                        <div className='tfb_select'>
                            <CustomSelect placeholder={'select criterion'} options={option_critetion} onSelectChange={handleSelectChange}/>
                            <CustomSelect placeholder={'select range'} options={option_range} onSelectChange={handleSelectChange}/>
                           {role && <CustomSelect placeholder={'select change'} options={option_change}  onSelectChange={handleSelectChange}/>}
                        </div>
                    </div>
                    <div className="tfb_change">
                        <ButtonChange text={"apply"}/>
                        <ButtonChange text={"reset"}/>
                        <ButtonChange text={"save"}/>
                    </div>
                </div>
                <div className='tf_box'>
                    <div className='tfb_name'>
                        <p className='text_mnt_f26_l26'>Name</p>
                        <div className='tfb_select'>
                           <input type="text" placeholder='Search..'/>
                        </div>
                    </div>
                    <div className="tfb_change">
                        <ButtonChange text={"apply"}/>
                        <ButtonChange text={"reset"}/>
                    </div>
                </div>
            </section>
            <section className='tour_card'>

            </section>
            <section className='tour_report'>

            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link}/>
        </>
    );
};

export default TourSection;