import React, { useState, useEffect, useRef } from 'react';
import './Select.scss'; 
import { SelectArrow } from '../../../utils/icons';

const Select = ({ placeholder, options, onSelectChange }) => {
    console.log(options)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.option);
        setIsOpen(false);
        onSelectChange(placeholder, option.value);
    };

    // Обработка клика вне компонента
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='select_modal'>
            <div className="custom_select" ref={selectRef}>
                <div className="select_header" onClick={toggleDropdown}>
                    <img src={SelectArrow} alt="op" />
                    <p className="text_mln_f16_l16">{selectedOption}</p>
                </div>
                {isOpen && (
                    <div className="options">
                        {options.map((option, index) => (
                            <p
                                key={index}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.option}
                            </p>
                        ))}
                    </div>
                )}
            </div> 
            <p className='text_mln_f12_l12'>{placeholder}</p>
        </div>       
    );
};

export default Select;   