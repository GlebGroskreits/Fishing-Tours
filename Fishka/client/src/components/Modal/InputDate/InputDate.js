import React, { useEffect, useState } from 'react';
import '../Input/Input.scss'; // Импортируем стили
import './InputDate.scss'

const InputDate = ({ placeholder, onInputChange, minDate }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onInputChange(placeholder, newValue);
    };

    if(minDate){
        minDate = new Date().toISOString().split('T')[0];
    }

    return (
        <div className="input_modal">
            <input 
                type="date" 
                placeholder={placeholder} 
                value={value} 
                onChange={handleChange} 
                min={minDate}
            />
            <p className='text_mln_f12_l12'>{placeholder}</p>
        </div>
    );
};

export default InputDate;