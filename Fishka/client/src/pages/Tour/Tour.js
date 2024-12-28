import React from "react";
import './Tour.scss';
import { TourSection } from "../../utils/components";
import { TourBC } from "../../utils/images";

const bcImage ={
    image: TourBC,
    textUp: 'Your tour starts here',
    textLow: 'interesting tours for absolutely anyone',
}

const Tour = () => {
    return (
       <>
            <TourSection bcImage={bcImage}/>
       </>
    );
}

export default Tour;