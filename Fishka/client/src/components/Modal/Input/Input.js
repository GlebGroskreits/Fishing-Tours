import React, { useEffect, useState } from 'react';
import './Input.scss'; // Импортируем стили

const Input = ({placeholder, onInputChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onInputChange(placeholder, newValue);
    };
    return (
        <div className="input_modal">
            <input type="text" placeholder={placeholder} value={value} onChange={handleChange} />
            <p className='text_mln_f12_l12'>{placeholder}</p>
        </div>
    );
};

export default Input;   