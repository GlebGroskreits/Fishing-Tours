import React, { useEffect, useState } from 'react';
import './CardCreateTour.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, setHeaderText, setModalContent, setResultContent } from '../../store/slices/modalSlice';
import { AddPhoto, ButtonModal, InputDate, InputModal, SelectModal } from '../../utils/components';
import { createTour, createTourActive } from '../../store/slices/tourSlice';
import { getGuide } from '../../store/slices/guideSlice';

const CardCreateTour = ({ type, change, tours }) => {
    const dispatch = useDispatch();

    const [inputValues, setInputValues] = useState(null);
    const [guideSelect, setGuideSelect] = useState(null);
    const [tourSelect, setTourSelect] = useState(null);

    const resultContent = useSelector((state) => state.modal.resultContent)
    const guide = useSelector((state) => state.guide.guide)

    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };

    useEffect(() => {
        dispatch(getGuide());
    }, [])

    useEffect(() => {
        setGuideSelect(guide.map(guide => ({
            value: guide.id_guide,
            option: guide.name + ' ' + guide.surname
        })));
    }, [guide]);

    useEffect(() => {
        setTourSelect(tours.map(tour =>({
            value: tour.id,
            option: tour.name
        })))
    }, [tours])

    useEffect(() => {
        dispatch(setResultContent(inputValues));

        tours = tours.map((tour) => tour.name)
    }, [inputValues])


    const a = ['sdf', 'sdf']

    const handleCreateModal = () => {
        dispatch(openModal());
        dispatch(setHeaderText('New Tour'));

        let content;
        if (change == 'tour') {
            content = (
                <>
                    <InputModal placeholder="name" onInputChange={handleChange} />
                    <InputModal placeholder="duration" onInputChange={handleChange} />
                    <InputModal placeholder="description" onInputChange={handleChange} />
                    <AddPhoto placeholder={'image'} onPhotoChange={handleChange} />
                    <ButtonModal text1={'discard'} text2={'create'} onClick={(data) => dispatch(createTour({tourData: data}))}/>                 
                </>
            );
        } else {
            content = (
                <>
                    <SelectModal placeholder={'tour'}  options={tourSelect} onSelectChange={handleChange} />
                    <SelectModal placeholder={'guide'}  options={guideSelect} onSelectChange={handleChange} />
                    <InputDate placeholder="date start" onInputChange={handleChange} minDate={true} />
                    <ButtonModal text1={'discard'} text2={'create'} onClick={(data) => dispatch(createTourActive({tourActiveData: data}))}/>           
                </>
            );
        }

        dispatch(setModalContent(content));
    };

    return (
        <div className='card_create_tour'>
            <p className='text_mnt_f24_l24'>New tour</p>
            <button className='button_more' onClick={handleCreateModal}>
                <p className='text_mln_f16_l16'>create</p>
            </button>
        </div>
    );
};

export default CardCreateTour;