import React,  { useState, useEffect, useRef } from 'react';
import './CustomSelect.scss';
import { SelectArrow } from '../../utils/icons';

const CustomSelect = ({ placeholder, options, onSelectChange  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelectChange(option); 
    };

    //вне документа
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
        <div className="custom_select" ref={selectRef}>
            <div className="select_header" onClick={toggleDropdown}>
                <img src={SelectArrow} alt="op"/>
                <p className="text_mln_f18_l18">{selectedOption}</p>
            </div>
            {isOpen && (
                <div className="options">
                    {options.map((option, index) => (
                        <p
                            key={index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;