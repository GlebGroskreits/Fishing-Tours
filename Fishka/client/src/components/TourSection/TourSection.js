import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TourSection.scss'; 
import { ButtonChange, LinkSection, CustomSelect, CardTour, CardCreateTour } from '../../utils/components';
import { TourBC } from '../../utils/images';
import { Download } from '../../utils/icons';

const pageLink = {
    link: '/review',
    header: 'Leave feedback',
    page: 'review',
};

const options = {
    criterion: ['name', 'duration'],
    range: ['a - z', 'z - a'],
    change: ['tour', 'active tour'],
};

const TourSection = ({ bcImage, type }) => {
    const role = useSelector((state) => state.auth.user.role);
    const {tours, activeTours} = useSelector((state) => state.tour)

    const [selectedOptions, setSelectedOptions] = useState({
        criterion: '',
        range: '',
        change: 'active tour',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Загрузка состояния из локального хранилища
    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('tourFilters'));
        if (savedFilters) {
            setSelectedOptions(savedFilters);
        }
    }, []);

    const handleSelectChange = (value, type) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleApply = () => {
        console.log('Applied filters:', selectedOptions);
        // Здесь можно добавить логику применения фильтров
    };

    const handleReset = () => {
        setSelectedOptions({
            criterion: '',
            range: '',
            change: 'active tour',
        });
        // localStorage.removeItem('tourFilters'); // Удаляем сохраненные фильтры
        localStorage.setItem('tourFilters', JSON.stringify(selectedOptions));
    };

    const handleSave = () => {
        console.log('Saved settings:', selectedOptions);
        localStorage.setItem('tourFilters', JSON.stringify(selectedOptions));
    };

    const currentTours = selectedOptions.change === 'tour' ? tours : activeTours;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentTours.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(currentTours.length / itemsPerPage);

    return (
        <>
            <section className="bc_image">
                <img src={bcImage.image} alt="bcTour" className="responsive_image"/>
                <p className={`text_mnt_f46_l50 ${bcImage.image === TourBC ? 'tour' : 'viptour'}`}>{bcImage.textUp}</p>
                <p className="text_mln_f26_l26">{bcImage.textLow}</p>
            </section>
            <section className="tour_filter">
                <div className='tf_box'>
                    <div className='tfb_name'>
                        <p className='text_mnt_f26_l26'>Filter</p>
                        <div className='tfb_select'>
                        <CustomSelect 
                            placeholder={'criterion'} 
                            options={options.criterion} 
                            onSelectChange={(value) => handleSelectChange(value, 'criterion')}
                        />
                        <CustomSelect 
                            placeholder={'range'} 
                            options={options.range} 
                            onSelectChange={(value) => handleSelectChange(value, 'range')}
                        />
                        {role == 'guide' && 
                            <CustomSelect 
                                placeholder={'change'} 
                                options={options.change}  
                                onSelectChange={(value) => handleSelectChange(value, 'change')}
                            />}
                        </div>
                    </div>
                    <div className="tfb_change">
                        <ButtonChange text={"apply"} onClick={handleApply} />
                        <ButtonChange text={"reset"} onClick={handleReset} />
                        <ButtonChange text={"save"} onClick={handleSave} />
                    </div>
                </div>
                <div className='tf_box'>
                    <div className='tfb_name'>
                        <p className='text_mnt_f26_l26'>Name</p>
                        <div className='tfb_select'>
                           <input type="text" placeholder='Search..'/>
                        </div>
                    </div>
                    <div className="tfb_change">
                        <ButtonChange text={"apply"} onClick={handleApply} />
                        <ButtonChange text={"reset"} onClick={handleReset} />
                    </div>
                </div>
            </section>
            <section className='tour_card'>
                <div className='cards'>
                    {currentItems.map((tour, index) => (
                        <CardTour key={index} tour={tour}/>
                    ))}
                    {role == 'guide' && <CardCreateTour type={type} change={selectedOptions.change} tours={tours}/>}
                </div>
                <div className={`${totalPages > currentItems.length ? 'paggination' : 'paggination none'}`}>
                    {totalPages > currentItems.length && [...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        ></div>
                    ))}
                </div>
            </section>
            <section className='tour_report'>
                <div className="tr_container">
                    <img src={Download} alt="download" />
                    <p className="text_mln_f26_l26">download tour</p>
                </div>
            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link} />
        </>
    );
};

export default TourSection;