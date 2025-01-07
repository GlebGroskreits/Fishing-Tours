import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TourSection.scss'; 
import { ButtonChange, LinkSection, CustomSelect, CardTour, CardCreateTour } from '../../utils/components';
import { TourBC } from '../../utils/images';
import { Download } from '../../utils/icons';
import { getGuide } from '../../store/slices/guideSlice';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    const dispatch = useDispatch();

    const role = useSelector((state) => state.auth.user.role);
    const { tours, activeTours } = useSelector((state) => state.tour);

    const [selectedOptions, setSelectedOptions] = useState({
        criterion: '',
        range: '',
        change: 'active tour',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTours, setFilteredTours] = useState([]);

    // Загрузка состояния из локального хранилища
    useEffect(() => {
        dispatch(getGuide());
        const savedFilters = JSON.parse(localStorage.getItem('tourFilters'));
        if (savedFilters) {
            setSelectedOptions(savedFilters);
        }
    }, [dispatch]);

    const handleSelectChange = (value, type) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleApply = () => {
        const currentTours = selectedOptions.change === 'tour' ? tours : activeTours;

        // Фильтрация
        const newFilteredTours = currentTours.filter((tour) => 
            tour.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Сортировка
        const sortedTours = newFilteredTours.sort((a, b) => {
            if (selectedOptions.criterion === 'duration') {
                return selectedOptions.range === 'a - z' ? a.duration - b.duration : b.duration - a.duration;
            } else {
                return selectedOptions.range === 'a - z' 
                    ? a.name.localeCompare(b.name) 
                    : b.name.localeCompare(a.name);
            }
        });

        setFilteredTours(sortedTours);
        setCurrentPage(1); // Сброс текущей страницы при применении фильтров
    };

    const handleReset = () => {
        setSelectedOptions({
            criterion: '',
            range: '',
            change: 'active tour',
        });
        setSearchTerm(''); // Очищаем поле поиска
        setFilteredTours([]); // Очищаем фильтры
        localStorage.removeItem('tourFilters'); // Удаляем сохраненные фильтры
        setCurrentPage(1); // Сброс текущей страницы
    };

    const handleSave = () => {
        localStorage.setItem('tourFilters', JSON.stringify(selectedOptions));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTours.length > 0 ? filteredTours.slice(indexOfFirstItem, indexOfLastItem) : (selectedOptions.change === 'tour' ? tours : activeTours).slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredTours.length > 0 ? filteredTours.length : (selectedOptions.change === 'tour' ? tours.length : activeTours.length) / itemsPerPage);

    const handleDownloadExcel = () => {
        const toursToDownload = filteredTours.length > 0 ? filteredTours : (selectedOptions.change === 'tour' ? tours : activeTours);
        const data = toursToDownload.map(tour => ({
            Name: tour.name,
            Duration: tour.duration,
            Description: tour.description, // Добавляем описание
            Type: tour.type, // Добавляем тип
            Cost: tour.cost_people, // Добавляем стоимость по людям
            Date_start: tour.date_start ? tour.date_start : undefined,
            Status: tour.status ? tour.status : undefined
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
            { wpx: 150 }, // Width for Name
            { wpx: 50 }, // Width for Duration
            { wpx: 500 }, // Max width for Description
            { wpx: 80 }, // Width for Type
            { wpx: 80 }, //...
            { wpx: 150 },
            { wpx: 80 },  
        ];
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, "tour_report.xlsx");
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
                            {role === 'guide' && 
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
                           <input type="text" placeholder='Search..' value={searchTerm} onChange={handleSearchChange} />
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
                    {role === 'guide' && <CardCreateTour type={type} change={selectedOptions.change} tours={tours}/>}
                </div>
                <div className={`${totalPages > 1 ? 'paggination' : 'paggination none'}`}>
                    {totalPages > 1 && [...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        ></div>
                    ))}
                </div>
            </section>
            <section className='tour_report'>
                <div className="tr_container" >
                    <img src={Download} alt="download" onClick={handleDownloadExcel}/>
                    <p className="text_mln_f26_l26" onClick={handleDownloadExcel}>download tour</p>
                </div>
            </section>
            <LinkSection text={pageLink.header} page={pageLink.page} link={pageLink.link} />
        </>
    );
};

export default TourSection;

