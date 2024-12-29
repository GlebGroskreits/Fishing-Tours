import React, { useEffect, useState } from 'react';
import './CardCreateTour.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, setHeaderText, setModalContent, setResultContent } from '../../store/slices/modalSlice';
import { AddPhoto, ButtonModal, InputDate, InputModal, SelectModal } from '../../utils/components';
import { createTour } from '../../store/slices/tourSlice';

const CardCreateTour = ({ type, change }) => {
    const dispatch = useDispatch();
    const [inputValues, setInputValues] = useState({
        name: '',
        duration: '',
        description: '',
        image: null,
    });
const resultContent = useSelector((state) => state.modal.resultContent)
    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };

    useEffect(() => {
        dispatch(setResultContent(inputValues))
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
                    <SelectModal placeholder={'guide'}  options={a} onSelectChange={handleChange} />
                    <SelectModal placeholder={'guide'}  options={a} onSelectChange={handleChange} />
                    <InputDate placeholder="date start" onInputChange={handleChange} minDate={true} />
                    {/* <ButtonModal text1={'discard'} text2={'create'} onClick={(data) => dispatch(createTour({tourData: data}))}/> */}
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