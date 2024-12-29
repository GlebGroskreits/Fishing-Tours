import React, { useEffect } from "react";
import './Tour.scss';
import { TourSection } from "../../utils/components";
import { TourBC } from "../../utils/images";
import { useDispatch } from "react-redux";
import { getTour } from "../../store/slices/tourSlice";

const bcImage ={
    image: TourBC,
    textUp: 'Your tour starts here',
    textLow: 'interesting tours for absolutely anyone',
}

const Tour = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTour({type: 'common'}));
    })

    return (
       <>
            <TourSection bcImage={bcImage}/>
       </>
    );
}

export default Tour;