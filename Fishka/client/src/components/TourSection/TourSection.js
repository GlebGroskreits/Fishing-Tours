import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TourSection.scss'; 
import { ButtonChange, LinkSection, CustomSelect, CardTour, CardCreateTour } from '../../utils/components';
import { TourBC } from '../../utils/images';

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
                        <CustomSelect 
                            placeholder={'change'} 
                            options={options.change}  
                            onSelectChange={(value) => handleSelectChange(value, 'change')}
                        />
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
                    {tours.map((tour, index) => (
                        <CardTour key={index} tour={tour}/>
                    ))}
                    <CardCreateTour type={type} change={selectedOptions.change}/>
                </div>
                <div className='paggination'>
                    {/* Пагинация может быть добавлена здесь */}
                </div>
            </section>
            <section className='tour_report'>
                {/* Отчет может быть добавлен здесь */}
            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link} />
        </>
    );
};

export default TourSection;