import React from 'react';
import { Link } from 'react-router-dom';
import './CardTour.scss'; 
import { STATIC_URL } from '../../http';

const CardTour = ({tour}) => {

    return (
       <div className='card_tour'>
        {console.log(`${STATIC_URL}${tour.image}`)}
            <img src={`${STATIC_URL}${tour.image}`} alt="" />
            <p className='text_mnt_f24_l24'>{tour.name}</p>
            <p className='text_mln_f18_l18'> Duration: {tour.duration} days</p>
            <p className='text_mln_f18_l26'>{tour.description}</p>
            <Link to="/selectTour" className='button_more'>
                <p className='text_mln_f16_l16'>more</p>
            </Link>
            {tour.date_start && <p className='text_mln_f16_l16'> {new Date(tour.date_start).toLocaleDateString('ru-RU')}</p>}
       </div>
    );
};

export default CardTour;