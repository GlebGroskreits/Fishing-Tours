import React, { useState } from 'react';
import './CustomSelect.scss';
import { SelectArrow } from '../../utils/icons';

const CustomSelect = ({ placeholder, options }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="custom_select">
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