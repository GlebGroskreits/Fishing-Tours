import React, { useDebugValue, useEffect, useState } from 'react';
import './SelectDetails.scss'; 
import {ButtonChange, ButtonModal, HeaderSection, InputModal, SelectModal} from '../../utils/components';
import { openModal, setHeaderText, setModalContent, setResultContent } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeTour } from '../../store/slices/tourSlice';

const SelectDetails = ({}) => {

    const dispatch = useDispatch();

    const tour = useSelector((state) => state.tour.selectedTour)    
    const guide = useSelector((state) => state.guide.guide)

    const matchingGuide = guide.find(guide => guide.id_guide === tour.id_guide);

    const [inputValues, setInputValues] = useState(null);
    const [guideSelect, setGuideSelect] = useState(null);

    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };

    useEffect(() => {
        dispatch(setResultContent(inputValues));
    }, [inputValues])    

    useEffect(() => {
        if (tour) {
            setInputValues((prev) => ({
                ...prev,
                id: tour.id_tour 
            }));
        }

    }, [tour]);
    
    const handleCreateModal = () => {
        dispatch(openModal());
        dispatch(setHeaderText('Change tour'));

        let content = (
            <>
            <InputModal placeholder="cost" onInputChange={handleChange} />
            <ButtonModal text1={'discard'} text2={'change'} onClick={(data) => dispatch(changeTour({tourData: data}))}/>     
        </> 
        )

        dispatch(setModalContent(content));
    }

    return (
        <section className="select_details">
            <HeaderSection textUp={"Details"} textLow={"more about the tour"} />
            <div className="sd_cards">
                <div className="sd_card">
                    <p className='text_mln_f20_l22'>Guide</p>
                    { matchingGuide && <p className='text_mln_f18_l26'>{matchingGuide.name} {matchingGuide.surname}</p>}
                    { !matchingGuide && <p className='text_mln_f18_l26'>on Active Tour</p>}      
                </div>
                <div className="sd_card">
                    <p className='text_mln_f20_l22'>Cost</p>
                    <p className='text_mln_f18_l26'>{tour.cost_people} $</p>
                </div>
                <div className="sd_card">
                    <p className='text_mln_f20_l22'>Contact</p>
                    {matchingGuide && <p className='text_mln_f18_l26'>{matchingGuide.telephone}</p>}
                    {!matchingGuide && <p className='text_mln_f18_l26'>on Active Tour</p>}
                </div>
            </div>
            <div className="sd_tool">
                {!tour.date_start && <ButtonChange text={'change'} onClick={handleCreateModal}/>}
            </div>
        </section>
    );
};

export default SelectDetails;