import React, { useEffect, useState } from 'react';
import './SelectDay.scss'; 
import {AddPhoto, ButtonChange, ButtonModal, HeaderSection, InputModal} from '../../utils/components';
import { openModal, setHeaderText, setModalContent, setResultContent } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createProgram } from '../../store/slices/tourSlice';
import { STATIC_URL } from '../../http';

const SelectDay = ({}) => {

    const dispatch = useDispatch();

    const [inputValues, setInputValues] = useState(null);
    const [programIndex, setProgramSelect] = useState(0);

    const tour = useSelector((state) => state.tour.selectedTour);

    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };    

    useEffect(() => {
        if(!inputValues){
            setInputValues((prev) => ({
                id: tour.id_tour
            }));
        }

        dispatch(setResultContent(inputValues));
    }, [inputValues])    

    useEffect(() => {
        dispatch(setResultContent(null));
        if(tour.program){
                setProgramSelect((prev) => ({
                    ...tour.program[0],
                }))
        }
    }, [])

    const handleCreateModal = () => {
        dispatch(openModal());
        dispatch(setHeaderText('Add day'));

        let content = (
            <>
                <InputModal placeholder="name" onInputChange={handleChange} />
                <InputModal placeholder="description" onInputChange={handleChange} />
                <AddPhoto placeholder={'image'} onPhotoChange={handleChange} />
                <ButtonModal text1={'discard'} text2={'add'} onClick={(data) => dispatch(createProgram({tourData: data}))}/>                
            </> 
        );

        dispatch(setModalContent(content));
    };

    return (
        <section className="select_day">
            <HeaderSection textUp={"Program"} textLow={"every day is unique"} />
            {tour && tour.program && tour.program.length > 0 ? (
                 <div className="sd_program">
                    <img src={`${STATIC_URL}${tour.program[programIndex].image}`} alt="image" />
                 <div className="sdp_text">
                     <p className='text_mnt_f26_l26'>{tour.program[programIndex].name}</p>
                     <p className='text_mln_f22_l22'>Day: {programIndex + 1} days</p>
                     <p className='text_mln_f20_l26'>{tour.program[programIndex].description}</p>
                 </div>
                 <div className="sdp_day">
                    {tour.program.map((prog, index) => (
                        <img src={`${STATIC_URL}${prog.image}`} alt="im" onClick={() => setProgramSelect(index)} key={index}/>
                    ))}
                 </div>
             </div>
            )  : (
                <p className='text_mnt_f26_l26'>No program of tour</p>
            )}
            <div className="sd_toolb">
                <ButtonChange text={"add"} onClick={handleCreateModal} />
            </div>
        </section>
    );
};

export default SelectDay;