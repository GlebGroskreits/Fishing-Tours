import React, { useEffect, useState } from "react";
import './Review.scss';
import { Download, StarF, StarNF } from '../../utils/icons';
import { ButtonChange, CustomSelect, HeaderSection } from "../../utils/components";
import { useDispatch, useSelector } from "react-redux";
import { REV1, REV2, REV3 } from "../../utils/images";
import { getTour } from "../../store/slices/tourSlice";
import { createReview, getReview } from "../../store/slices/reviewSlice";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const gallery = [
    {
        image: REV1,
        h1: 'First catch of my life',
        h2: 'Our dear client has never been fishing.',
    },
    {
        image: REV2,
        h1: 'Family outing',
        h2: 'Dad showed the rest of us how to rest',
    },
    {
        image: REV3,
        h1: 'Rest from work',
        h2: 'We like to spend time with our son in the company of men fishing.',
    },
    {
        image: REV2,
        h1: 'Family outing',
        h2: 'Dad showed the rest of us how to rest',
    },
]

const Review = () => {
    const dispatch = useDispatch();

    const {id} = useSelector((state) => state.auth.user)
    const review = useSelector((state) => state.review.review)

    const [tours, setTours] = useState([]);
    const [tourSelect, setTourSelect] = useState([]);
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        dispatch(getReview());
    }, [])

    console.log(review)

    useEffect(() => {
        const fetchTours = async () => {
            const tourC = await dispatch(getTour({ type: 'common' }));
            const tourV = await dispatch(getTour({ type: 'vip' }));

            const combinedTours = [...tourC.payload.tours, ...tourV.payload.tours];
            setTours(combinedTours);
        };

        fetchTours();
    }, [dispatch]);

    useEffect(() => {
        setTourSelect(tours.map(tour => tour.name)); // Создаем массив только с названиями туров
    }, [tours]);

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

    const [filledStars, setFilledStars] = useState([true, false, false, false, false]);

    const handleStarClick = (index) => {
        const newFilledStars = filledStars.map((_, i) => i < index);
        setFilledStars(newFilledStars);
    };

    const [selectTour, setSelectOpen] = useState(false);

    const handleSelect = (open) => {
        if(!open){
            setSelectedTourId(null)
        }
        setSelectOpen(open);
    }

    const handleReviewSubmit = () => {
        const activeStarsCount = filledStars.filter(filled => filled).length; // Количество активных звезд
        const selectedTourName = tourSelect.find((name, index) => name === selectedTourId); // Находим выбранный тур
        const selectedTour = tours.find(tour => tour.name === selectedTourName); // Получаем объект тура по названию

        dispatch(createReview({id_client: id, id_tour: selectedTour ? selectTour.id : null , raiting: activeStarsCount, description: reviewText }))
    };

    const handleDownloadExcel = () => {
        const data = review.map(rev => ({
            Name_tour: rev.tour ? rev.tour : 'enterprices',
            Description: rev.description,
            Raiting: rev.raiting,
            User: `${rev.userName} ${rev.userSurname}`
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tours");
    
        // Устанавливаем выравнивание по центру (горизонтально и вертикально)
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
                if (cell) {
                    cell.s = {
                        alignment: { vertical: "center", horizontal: "center" },
                        wrapText: true // Разрешаем перенос текста
                    };
                }
            }
        }
    
        // Установка ширины столбцов
        worksheet['!cols'] = [
            { wpx: 150 }, 
            { wpx: 500 }, 
            { wpx: 50 }, 
            { wpx: 200 }, 
        ];
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, "tour_report.xlsx");
    };

    return (
       <>
        <section className="review_gallery">
            <HeaderSection textUp={"Gallery"} textLow={"best moments on tour"} />
            <div className="sg_picture">
                {gallery && gallery.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div className="sgp_card" key={index}>
                            <img src={item.image} alt="image" />
                            <div className="sgpc_box">
                                <p className="text_mln_f20_l22">{item.h1}</p>
                                <p className="text_mln_f18_l26">{item.h2}</p>
                            </div>
                        </div>
                        
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
            </div>
        </section>
        <section className="review_person">
            <HeaderSection textUp={"Leave a review"} textLow={"share your experience with others"} />
            <div className="rp_cards">        
                {review ? (
                    <>
                        {review.map((rev, index) => { // Убираем лишний review &&
                            return ( // Добавляем return
                                <div className="rpc_card" key={index}> {/* Добавляем key для rpc_card */}
                                    <div className="rpc_text">
                                        <span>
                                            <p className="text_mnt_f26_l26">{rev.userName} {rev.userSurname}</p> 
                                            <p className="text_mln_f22_l22">{rev.tour ? `Tour ${rev.tour}` : 'Enterproses'}</p>
                                        </span>
                                        <div className="rpc_image">
                                            {[...Array(rev.raiting)].map((_, index) => ( 
                                                <img key={index} src={StarF} alt={rev.raiting} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text_mln_f20_l26">{rev.description}</p>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <p className="text_mnt_f26_l26">No content in review</p>
                    </>
                )}
            </div>

        </section>
        <section className='tour_report'>
            <div className="tr_container">
                <img src={Download} alt="download"  onClick={handleDownloadExcel}/>
                <p className="text_mln_f26_l26"  onClick={handleDownloadExcel}>download review</p>
            </div>
        </section>
        <section className="review_add">
            <HeaderSection textUp={"Leave a review"} textLow={"share your experience with others"} />
            <div className="ra_perfom">
                <div className="rap_box">
                    <p className="text_mnt_f22_l22">Performance Review</p>
                    <div className="rap_box_button">
                        <ButtonChange text={'enterprises'} onClick={() => handleSelect(false)} />
                        <ButtonChange text={'tour'} onClick={() => handleSelect(true)} />
                    </div>
                </div>
                {selectTour && <div className="rap_box">
                    <p className="text_mnt_f22_l22">Select</p>
                    <CustomSelect placeholder={'select tour'} options={tourSelect} onSelectChange={(selectedOption) => setSelectedTourId(selectedOption)}/>
                </div>}
                <div className="rap_box">
                    <p className="text_mnt_f22_l22">Evaluation</p>
                    <div className="stars">
                        {filledStars.map((filled, index) => (
                            filled ? (
                                <img src={StarF} alt="ye" onClick={() => handleStarClick(index + 1)} key={index}/>
                            ) : (
                                <img src={StarNF} alt="no" onClick={() => handleStarClick(index + 1)} key={index}/>
                            )
                        ))}
                    </div>

                </div>      
            </div>
            <div className="ra_desc">
                <p className="text_mnt_f22_l22">Description</p>
                <input type="text" placeholder="Your experience.." value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>
            </div>
            <div className="ra_send">
                <p className="text_mln_f18_l18">*for registered users only</p>
                <ButtonChange text={'send review'} onClick={handleReviewSubmit} />
            </div>
        </section>
       </>
    );
}

export default Review;