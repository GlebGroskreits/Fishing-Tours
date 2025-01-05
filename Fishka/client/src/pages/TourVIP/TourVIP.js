import React, { useEffect } from "react";
import './TourVIP.scss';
import { TourSection } from "../../utils/components";
import { VIPTourBC } from "../../utils/images";
import { useDispatch } from "react-redux";
import { getTour } from "../../store/slices/tourSlice";
import { getGuide } from "../../store/slices/guideSlice";

const bcImage ={
    image: VIPTourBC,
    textUp: 'You are as unique as this tour is to you',
    textLow: 'VIP tour - customer\'s request and wishes',
}

const TourVIP = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGuide())
        dispatch(getTour({type: 'vip'}));
    })

    return (
       <>
            <TourSection bcImage={bcImage}/>
       </>
    );
}

export default TourVIP;