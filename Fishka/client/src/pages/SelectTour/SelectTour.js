import React, { useEffect, useState } from "react";
import './SelectTour.scss';
import { AddPhoto, ButtonChange, ButtonModal, InputModal, SelectDay, SelectDetails, SelectGallery } from "../../utils/components";
import { useDispatch, useSelector } from "react-redux";
import { STATIC_URL } from "../../http";
import { changeTour, getGallery, getProgram } from "../../store/slices/tourSlice";
import { openModal, setHeaderText, setModalContent, setResultContent } from "../../store/slices/modalSlice";
import { getGuide } from "../../store/slices/guideSlice";

const SelectTour = ({}) => {

    const role = useSelector((state) => state.auth.user.role)
    const tour = useSelector((state) => state.tour.selectedTour)

    const dispatch = useDispatch();

    const [inputValues, setInputValues] = useState(null);

    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };

    useEffect(() => { 
        if(tour){
            if(tour.date_start){
                dispatch(getGallery({id_tour: tour.id_tour}));
                dispatch(getProgram({id_tour: tour.id_tour}));
            }else{
                dispatch(getGallery({id_tour: tour.id}));
                dispatch(getProgram({id_tour: tour.id}));
            }
        }    
    }, [])

    useEffect(() => {
        if (tour) {
            setInputValues((prev) => ({
                ...prev,
                id: tour.id 
            }));
        }

    }, [tour]);

    useEffect(() => {
        dispatch(setResultContent(inputValues));

        // tours = tours.map((tour) => tour.name)
    }, [inputValues])


    const handleCreateModal = () => {
        dispatch(openModal());
        dispatch(setHeaderText('Change tour'));

        let content = (
            <>
                <InputModal placeholder="name" onInputChange={handleChange} />
                <InputModal placeholder="duration" onInputChange={handleChange} />
                <InputModal placeholder="description" onInputChange={handleChange} />
                <AddPhoto placeholder={'image'} onPhotoChange={handleChange} />
                <ButtonModal text1={'discard'} text2={'create'} onClick={(data) => dispatch(changeTour({tourData: data}))}/>                
            </> 
        );

        dispatch(setModalContent(content));
    };

    const handleRefuse = () => {

    }

    const handleDone = () => {
        
    }

    const handleStart = () => {

    }

    const handleReserve = () => {
        
    }

    return (
        <>
            {tour ? (
                <>
                    <section className="select_tour_header">
                        <img src={`${STATIC_URL}${tour.image}`} alt="image" />
                        <div className="st_text">
                            <p className="text_mnt_f26_l26">{tour.name}</p>
                            <p className="text_mln_f22_l22">Duration: {tour.duration} days</p>
                            <p className="text_mln_f20_l26">{tour.description}</p>
                        </div>
                        <div className="st_change">
                            {tour.date_start && 
                                (role == 'guide' ? (
                                    <>
                                        <ButtonChange text={"start"} onClick={handleStart} />
                                        <ButtonChange text={"done"} onClick={handleDone} />
                                    </>
                                ) : (
                                    <>
                                        <ButtonChange text={"reserve"} onClick={handleReserve} />
                                        <ButtonChange text={"refuse"} onClick={handleRefuse} />
                                    </>
                                ))}
                            {tour.date_start && <p className="text_mln_f16_l16">{new Date(tour.date_start).toLocaleDateString('ru-RU')}</p>}
                            {!tour.date_start &&  <p className="text_mln_f18_l26" onClick={handleCreateModal}>change</p>}
                        </div>
                    </section>
                    <SelectGallery />
                    <SelectDetails />
                    <SelectDay />
                </>
            ) : (
                <section className="select_tour_header">
                     <p className="text_mnt_f26_l26">Select a tour to view</p>
                </section>
            )}
        </>
       

    );
}

export default SelectTour;  