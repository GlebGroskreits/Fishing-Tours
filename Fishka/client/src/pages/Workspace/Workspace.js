import React, { useState } from "react";
import './Workspace.scss';
import { ButtonChange, HeaderSection, LinkSection } from "../../utils/components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedTour } from "../../store/slices/tourSlice";

const pageLink = {
    link: '/tour',
    header: 'More tour',
    page: 'tour',
};

const Workspace = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    
    let currentItems;
    let totalPages;
    
    // if(tour){
    //     const currentTours = tour;
    //     const indexOfLastItem = currentPage * itemsPerPage;
    //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //     currentItems = currentTours.slice(indexOfFirstItem, indexOfLastItem);
        
    //     totalPages = Math.ceil(currentTours.length / itemsPerPage);    
    // }

    return (
        <>
            <section className="personal_info">
               
                <div className="pi_pi_box">
                   <BigSmall big={'Name'} small={'sdf'} />
                   <BigSmall big={'Surname'} small={'sdf'} />
                   <BigSmall big={'Patronymic'} small={'sdf'} />
                   <BigSmall big={'Telephone'} small={'sdf'} />
                   <BigSmall big={'Email'} small={'sdf'} />
                   <BigSmall big={'Birthday'} small={'sdf'} />
                </div>
                <div className="pi_pi">
                    <HeaderSection textUp={"Tour"} textLow={"your best thing in life"} />
                    <div className="pi_tours">
                        <div className='card_tour'>
                            <p className='text_mnt_f24_l24'>tour.name</p>
                            <p className='text_mln_f18_l18'> Duration: tour.duration days</p>
                            <Link to="/selectTour" className='button_more' >  {/*onClick={() => dispatch(setSelectedTour(tour))}*/}
                                <p className='text_mln_f16_l16'>more</p>
                            </Link>
                            {/* <p className='text_mln_f16_l16'> {new Date(tour.date_start).toLocaleDateString('ru-RU')}</p> */}
                        </div>
                    </div>
                    <div className="pi_tool">
                        {/* <div className={`${totalPages > 1 ? 'paggination' : 'paggination none'}`}>
                            {totalPages > 1 && [...Array(totalPages)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                ></div>
                            ))}
                        </div> */}
                    </div>
                    <div className="pi_box">
                        <ButtonChange text={"reserve"} onClick={console.log('d')} />
                        <ButtonChange text={"now"} onClick={console.log('d')} />
                        <ButtonChange text={"done"} onClick={console.log('d')} />
                    </div>
                </div>     
            </section>
            <section className="setting">
                <HeaderSection textUp={"Setting"} textLow={"convenience in details"} />
                <div className="s_button">
                    <div className="sb_text">
                        <p className="text_mln_f20_l26">Profile</p>
                        <ButtonChange text={"change"} onClick={console.log('d')} />
                    </div>
                        <ButtonChange text={"exit"} onClick={console.log('d')} />
                </div>
            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link} />
        </>
    );
}

export default Workspace;

const BigSmall = ({big, small}) => {
    return (
        <div>
            <p className="text_mnt_f20_l22 big ">{big}</p>
            <p className="text_mln_f20_l20 small">{small}</p>
        </div>
    )
}