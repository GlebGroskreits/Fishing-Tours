import React, { useEffect, useState } from "react";
import './Workspace.scss';
import { ButtonChange, ButtonModal, HeaderSection, InputDate, InputModal, LinkSection } from "../../utils/components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTour } from "../../store/slices/tourSlice";
import { changePersonal, getRequest, getRequestGuide, getUser } from "../../store/slices/authSlice";
import { openModal, setHeaderText, setModalContent, setResultContent } from "../../store/slices/modalSlice";

const pageLink = {
    link: '/tour',
    header: 'More tour',
    page: 'tour',
};

const Workspace = () => {
    const dispatch = useDispatch();

    const { id, role } = useSelector((state) => state.auth.user);
    const user = useSelector((state) => state.auth.myUser);
    const tourMy = useSelector((state) => state.auth.myTour);

    const [tour, setTour] = useState(null)
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    
    const [inputValues, setInputValues] = useState(null);
    
    const handleChange = (placeholder, value) => {
        setInputValues((prev) => ({
            ...prev,
            [placeholder]: value
        }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUser({ id_user: id }));
            if(role == 'client'){
                await dispatch(getRequest({id_client: id}))
            }else{
                await dispatch(getRequestGuide({id_guide: id}))
            }

            setLoading(false); // Устанавливаем loading в false после загрузки данных
        };

        fetchUser();
        
    }, [dispatch, id]);

    useEffect(() => {
            if (id) {
                setInputValues((prev) => ({
                    ...prev,
                    id_user: id
                }));
            }
    
        }, [id]);

    useEffect(() => {
        if(tourMy){
            setTour(tourMy.reserved)
        }
    },[tourMy])

    useEffect(() => {
        dispatch(setResultContent(inputValues));
    }, [inputValues])  

    if (loading) {
        return <div className="loading">Loading...</div>; 
    }

    let currentItems;
    let totalPages;

    if(tour){
        const currentTours = tour;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        currentItems = currentTours.slice(indexOfFirstItem, indexOfLastItem);
    
        totalPages = Math.ceil(currentTours.length / itemsPerPage);
    }    

  

    const handleCreateModal = () => {
        dispatch(openModal());
        dispatch(setHeaderText('Change profile'));

        let content = (
            <>
                <InputModal placeholder="name" onInputChange={handleChange} />
                <InputModal placeholder="surname" onInputChange={handleChange} />
                <InputModal placeholder="patronymic" onInputChange={handleChange} />
                <InputModal placeholder="telephone" onInputChange={handleChange} />
                <InputDate placeholder="birthday" onInputChange={handleChange} />
                <ButtonModal text1={'discard'} text2={'change'} onClick={(data) => dispatch(changePersonal({personalData: data}))}/>                
            </> 
        );

        dispatch(setModalContent(content));
    };

    const handleExit = () => {
        localStorage.removeItem('token');

        window.location.reload();
    }

    return (
        <>
            {user ? (
                <section className="personal_info">
                    <div className="pi_pi_box">
                        <BigSmall big={'Name'} small={user.user_personal.name} />
                        <BigSmall big={'Surname'} small={user.user_personal.surname} />
                        <BigSmall big={'Patronymic'} small={user.user_personal.patronymic} />
                        <BigSmall big={'Telephone'} small={user.user_personal.telephone} />
                        <BigSmall big={'Email'} small={user.email} />
                        <BigSmall 
                            big={'Birthday'} 
                            small={new Date(user.user_personal.birthday).toLocaleDateString('ru-RU')} 
                        />
                    </div>
                    <div className="pi_pi">
                        <HeaderSection textUp={"Tour"} textLow={"your best thing in life"} />
                        <div className="pi_tours">
                            {tour.length > 0 && tour ? (
                                <>
                                    {currentItems.map((tc, index) => (
                                        <div className='card_tour' key={index}>
                                            <p className='text_mnt_f24_l24'>{tc.name}</p>
                                            <p className='text_mln_f18_l18'> Duration: {tc.duration} days</p>
                                            <Link to="/selectTour" className='button_more' onClick={() => dispatch(setSelectedTour(tour[0]))}>
                                                <p className='text_mln_f16_l16'>more</p>
                                            </Link>
                                            {tc.date_start && <p className='text_mln_f16_l16'> {new Date(tc.date_start).toLocaleDateString('ru-RU')}</p>}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className="text_mnt_f26_l26">Reserved tour to view</p>
                            )}
                        </div>
                        <div className="pi_tool">
                        { tour && 
                            <div className={`${totalPages > 1 ? 'paggination' : 'paggination none'}`}>
                                {totalPages > 1 && [...Array(totalPages)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    ></div>
                                ))}
                            </div>}
                        </div>
                        <div className="pi_box">
                            <ButtonChange text={"reserve"} onClick={() => setTour(tourMy.reserved)} />
                            <ButtonChange text={"now"} onClick={() => setTour(tourMy.now)} />
                            <ButtonChange text={"done"} onClick={() => setTour(tourMy.done)} />
                        </div>
                    </div>
                </section>
            ) : (
                <></>
            )}

            <section className="setting">
                <HeaderSection textUp={"Setting"} textLow={"convenience in details"} />
                <div className="s_button">
                    <div className="sb_text">
                        <p className="text_mln_f20_l26">Profile</p>
                        <ButtonChange text={"change"} onClick={handleCreateModal}/>
                    </div>
                    <ButtonChange text={"exit"} onClick={handleExit}/>
                </div>
            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link} />
        </>
    );
}

export default Workspace;

const BigSmall = ({ big, small }) => {
    return (
        <div>
            <p className="text_mnt_f20_l22 big">{big}</p>
            <p className="text_mln_f20_l20 small">{small}</p>
        </div>
    );
}