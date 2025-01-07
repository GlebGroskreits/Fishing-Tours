import React, { use, useEffect, useState } from 'react';
import './SelectGallery.scss'; 
import {HeaderSection} from '../../utils/components';
import { useDispatch, useSelector } from 'react-redux';
import { createGallery } from '../../store/slices/tourSlice';
import { STATIC_URL } from '../../http';

const SelectGallery = () => {

    const dispatch = useDispatch()
    const role = useSelector((state) => state.auth.user.role)
    const tour = useSelector((state) => state.tour.selectedTour);
    const gallery = useSelector((state) => state.tour.selectedTour.gallery)
    

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    let currentItems;
    let totalPages;

    if(gallery){
        const currentTours = gallery;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        currentItems = currentTours.slice(indexOfFirstItem, indexOfLastItem);
    
        totalPages = Math.ceil(currentTours.length / itemsPerPage);
    
    }

    const handleAdd = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            dispatch(createGallery({tourData: {id: tour.id_tour, image: file}}))
        }
    }

    return (
        <section className="select_gallery">
            <HeaderSection textUp={"Gallery"} textLow={"best moments on tour"} />
            <div className="sg_picture">
                {gallery && gallery.length > 0 ? (
                    currentItems.map((image, index) => (
                        <img src={`${STATIC_URL}${image.image || image.name}`} alt="image" key={index}/>
                    ))
                ) : (
                    <>
                        <p className="text_mnt_f26_l26">No content in gallery</p>
                    </>
                )}
            </div>
            <div className="sg_tool">
               { gallery && 
                <div className={`${totalPages > 1 ? 'paggination' : 'paggination none'}`}>
                    {totalPages > 1 && [...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        ></div>
                    ))}
                </div>}
                {role !='client' && 
                    <>
                        <input type="file" accept="image/*" onChange={handleAdd} id="file-upload"/>
                        <label htmlFor="file-upload" className="button_change">
                            <p className='text_mln_f18_l18'>add</p>
                        </label>
                    </>
                }
            </div>
        </section>
    );
};

export default SelectGallery;